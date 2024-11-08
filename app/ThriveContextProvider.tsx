import { Period } from '@/components/types/types';
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

interface ThriveContextType {
  previousPeriods: Period[];
  selectedPeriod: Period | undefined;
  setSelectedPeriod: (period: Period) => void;
  mostRecentPeriod: Period | undefined;
  mostRecentPeriodSelected: boolean;
  handleAddPeriod: (period: Period) => void;
  handleReturnToCurrentPeriod: () => void;
}

const ThriveContext = createContext<ThriveContextType>({
  previousPeriods: [],
  selectedPeriod: undefined,
  setSelectedPeriod: () => {},
  mostRecentPeriod: undefined,
  mostRecentPeriodSelected: false,
  handleAddPeriod: () => {},
  handleReturnToCurrentPeriod: () => {},
});

export const ThriveProvider = ({ children }: { children: ReactNode }) => {
  const [previousPeriods, setPreviousPeriods] = useState<Period[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>();
  const mostRecentPeriod = useRef<Period>();
  const mostRecentPeriodSelected = mostRecentPeriod.current?.id === selectedPeriod?.id;
  const handleAddPeriod = (period: Period) => {
    setPreviousPeriods((prevPeriods) => [period, ...prevPeriods]);
    // create a new period with zero rows and set it as the selected period
    const newPeriod: Period = {
      id: (selectedPeriod?.id ?? 0) + 1,
      name: 'New Period',
      duration: 7,
      completion: 0,
      tasks: [],
    };
    setSelectedPeriod(newPeriod);
    mostRecentPeriod.current = newPeriod;
  };

  const handleReturnToCurrentPeriod = () => {
    setSelectedPeriod(mostRecentPeriod.current);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/periods');
      const data = await response.json();
      const currentPeriod = data[data.length - 1];
      setSelectedPeriod(currentPeriod);
      mostRecentPeriod.current = currentPeriod;
      setPreviousPeriods(data.slice(0, -1));
    };
    fetchData();
  }, []);

  const thriveValue = {
    previousPeriods,
    selectedPeriod,
    setSelectedPeriod,
    mostRecentPeriod: mostRecentPeriod.current,
    mostRecentPeriodSelected,
    handleAddPeriod,
    handleReturnToCurrentPeriod,
  };
  return <ThriveContext.Provider value={thriveValue}>{children}</ThriveContext.Provider>;
};

export const useThriveContext = () => useContext(ThriveContext);

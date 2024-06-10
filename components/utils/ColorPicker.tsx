/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k9Xf5pklZfZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import React, { useState } from 'react';

// TODO: get better colors
const colors = [
  '#C1F7DC',
  '#C3D2D5',
  '#BDA0BC',
  '#A2708A',
  '#824670',
  '#DAEDF0',
  '#E2D6E4',
  '#D7C1D6',
  '#C8B2C5',
  '#B9A3B4',
  '#A89AA3',
  '#98919F',
  '#88888B',
  '#787F87',
  '#67757F',
  '#576B76',
  '#46616D',
  '#365764',
  '#264D5B',
  '#14434F',
  '#033946',
  '#003A42',
  '#003C3E',
  '#003E3A',
];

export default function ColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: (color: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(color);
  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setColor(selectedColor);
  };

  return (
    <div className='bg-white dark:bg-gray-950 rounded-lg shadow-lg p-3'>
      <div className='grid grid-cols-6 gap-2'>
        {colors.map((color, index) => (
          <button
            key={index}
            className={`h-8 w-8 rounded-md cursor-pointer ${
              selectedColor === color
                ? 'border-2 border-black'
                : 'border border-gray-300 dark:border-gray-600'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleSelectColor(color)}
          />
        ))}
      </div>
    </div>
  );
}

import React from 'react';

export const Input = ({ className, ...props }) => (
  <input
    className={`border border-gray-300 rounded px-2 py-1 ${className}`}
    {...props}
  />
);

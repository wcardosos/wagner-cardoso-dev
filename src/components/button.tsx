import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-brand-red py-3 px-8 font-bold rounded">
      {children}
    </button>
  );
}

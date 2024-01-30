import { Icon as PhosphorIcon } from '@phosphor-icons/react';
import React from 'react';

interface CarreerButtonProps {
  text: string
  icon: PhosphorIcon
}

export function CarreerButton({ text, icon: Icon }: CarreerButtonProps) {
  return (
    <button className="bg-brand-black-light hover:bg-brand-black-light/75 max-w-md w-full flex p-6 gap-2 justify-between rounded items-center shadow-md">
      <span className="font-bold">{text}</span>
      <Icon className="text-brand-red w-6 h-6" weight="fill" />
    </button>
  );
}
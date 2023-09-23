import React, { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-16 lg:mt-24">
      <h1 className="text-2xl font-bold text-brand-red mb-6">{title}</h1>
      {children}
    </section>
  );
}

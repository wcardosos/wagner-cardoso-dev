import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  id?: string;
  children: ReactNode;
}

export default function Section({ title, id, children }: SectionProps) {
  return (
    <section className="mt-16 lg:mt-24" id={id}>
      <h1 className="text-2xl font-bold text-brand-red mb-6">{title}</h1>
      {children}
    </section>
  );
}

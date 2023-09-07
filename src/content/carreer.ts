interface Job {
  carreerMoment: number;
  companyName: string;
  companyLogo: string;
  role: string;
  description: string;
  startMonth: string;
  endMonth: string;
}

export const jobs: Job[] = [
  {
    carreerMoment: 3,
    companyName: 'Prevision',
    companyLogo: '/assets/carreer/prevision-logo.webp',
    role: 'Desenvolvedor Fullstack',
    description:
      'Atualmente trabalho na empresa líder do mercado de construtechs no Brasil desenvolvendo produtos inovadores que auxiliam empresas do ramo da construção civil a serem mais eficientes.',
    startMonth: 'jul. 2022',
    endMonth: 'Atual',
  },
  {
    carreerMoment: 2,
    companyName: 'TAG Experiências Literárias',
    companyLogo: '/assets/carreer/tag-logo.webp',
    role: 'Desenvolvedor Backend',
    description:
      'Atuei como desenvolvedor no time do Backoffice. O time atendia principalmente as áreas de produto e logística da empresa. Forte experiência em suporte e desenvolvimento de ferramentas internas.',
    startMonth: 'abr. 2021',
    endMonth: 'mar. 2022',
  },
  {
    carreerMoment: 1,
    companyName: 'BPA Technologies',
    companyLogo: '/assets/carreer/bpa-logo.webp',
    role: 'Desenvolvedor RPA',
    description:
      'Desenvolvi e fiz manutenção em robôs de automação de processos para grandes empresas como Bradesco, Porto Seguro, Notre Dame Intermédica, entre outros.',
    startMonth: 'set. 2020',
    endMonth: 'abr. 2021',
  },
];

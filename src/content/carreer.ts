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
      'Lorem ipsum dolor sit amet consectetur. Consequat magna phasellus eleifend turpis odio congue malesuada. Risus mi fringilla amet eget. Et amet bibendum purus platea.',
    startMonth: 'jul. 2022',
    endMonth: 'Atual',
  },
  {
    carreerMoment: 2,
    companyName: 'TAG Experiências Literárias',
    companyLogo: '/assets/carreer/tag-logo.webp',
    role: 'Desenvolvedor Backend',
    description:
      'Lorem ipsum dolor sit amet consectetur. Consequat magna phasellus eleifend turpis odio congue malesuada. Risus mi fringilla amet eget. Et amet bibendum purus platea.',
    startMonth: 'abr. 2021',
    endMonth: 'mar. 2022',
  },
  {
    carreerMoment: 1,
    companyName: 'BPA Technologies',
    companyLogo: '/assets/carreer/bpa-logo.webp',
    role: 'Desenvolvedor RPA',
    description:
      'Lorem ipsum dolor sit amet consectetur. Consequat magna phasellus eleifend turpis odio congue malesuada. Risus mi fringilla amet eget. Et amet bibendum purus platea.',
    startMonth: 'set. 2020',
    endMonth: 'abr. 2021',
  },
];

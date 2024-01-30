import { Agile, Architecture, Backend, Cloud, CodeTechniques, Database, Frontend, Languages, Utilities } from './technologies';

interface Job {
  carreerMoment: number;
  companyName: string;
  companyLogo: string;
  role: string;
  description: {
    text: string
    impactPoints: string[]
  };
  technologies: string[]
  startMonth: string;
  endMonth: string;
}

export const jobs: Job[] = [
  {
    carreerMoment: 2,
    companyName: 'Prevision',
    companyLogo: '/assets/carreer/prevision-logo.webp',
    role: 'Desenvolvedor Fullstack',
    description: {
      text: 'Trabalhei na empresa líder do mercado de construtechs no Brasil desenvolvendo produtos inovadores que auxiliam empresas do ramo da construção civil a serem mais eficientes.',
      impactPoints: [
        'Aumento de receita com desenvolvimento e manutenção de ETL’s para análises avançadas em dashboards',
        'Contato direto na criação e desenvolvimento de novo produto',
        'Melhorias e definições de boas práticas de testes de software para a empresa.'
      ]
    },
    technologies: [
      Languages.RUBY,
      Languages.JAVASCRIPT,
      Languages.TYPESCRIPT,
      Backend.RUBY_ON_RAILS,
      Backend.NODEJS,
      Frontend.VUEJS,
      Database.POSTGRESQL,
      Utilities.DOCKER,
      Utilities.GIT,
      Utilities.CI_CD,
      Agile.SCRUM,
      Agile.KANBAN,
      Cloud.GCP,
      Architecture.CLEAN_ARCHITECTURE,
      Architecture.SERVERLESS,
      CodeTechniques.SOLID,
      CodeTechniques.TDD,
      CodeTechniques.DDD
    ],
    startMonth: 'jul. 2022',
    endMonth: 'out. 2023',
  },
  {
    carreerMoment: 1,
    companyName: 'TAG Experiências Literárias',
    companyLogo: '/assets/carreer/tag-logo.webp',
    role: 'Desenvolvedor Backend',
    description: {
      text: 'Atuei como desenvolvedor no time do Backoffice. O time atendia principalmente as áreas de produto e logística da empresa. Forte experiência em suporte e desenvolvimento de ferramentas internas.',
      impactPoints: [
        'Desenvolvimento de novas funcionalidades para o backoffice da empresa',
        'Manutenção de sistema legado',
        'Impacto positivo nos processos fiscais e logística da empresa'
      ]
    },
    technologies: [
      Languages.PYTHON,
      Languages.JAVASCRIPT,
      Backend.DJANGO,
      Backend.NODEJS,
      Database.POSTGRESQL,
      Utilities.DOCKER,
      Utilities.GIT,
      Agile.SCRUM,
      Cloud.AWS,
      Architecture.SERVERLESS,
    ],
    startMonth: 'abr. 2021',
    endMonth: 'mar. 2022',
  }
];

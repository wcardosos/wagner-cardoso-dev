export type Project = {
  name: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
  status: string;
};

export const projects: Project[] = [
  {
    name: "gitiam",
    description:
      "CLI para gerenciamento de identidades Git. Agrupa chave SSH, nome e email num perfil único e atômico, alternável com um comando — sem reconfigurar cada contexto manualmente.",
    stack: ["TypeScript", "Node.js"],
    links: [
      { label: "Repositório", href: "https://github.com/wcardosos/gitiam" },
    ],
    status: "Publicado",
  },
];

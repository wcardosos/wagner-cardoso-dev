export type Project = {
  name: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
  status: string;
};

export const projects: Project[] = [
  {
    name: "rulebox",
    description:
      "CLI para distribuir rules e configs de IDE entre projetos. Convergência de ergonomia entre Cursor, Claude Code e agentes locais.",
    stack: ["TypeScript", "Node.js"],
    links: [
      { label: "Repositório", href: "https://github.com/wcardosos/rulebox" },
    ],
    status: "Em desenvolvimento",
  },
];

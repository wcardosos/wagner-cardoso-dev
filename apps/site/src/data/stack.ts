import javaSvg from "devicon/icons/java/java-plain.svg?raw";
import typescriptSvg from "devicon/icons/typescript/typescript-plain.svg?raw";
import pythonSvg from "devicon/icons/python/python-plain.svg?raw";
import rubySvg from "devicon/icons/ruby/ruby-plain.svg?raw";
import springSvg from "devicon/icons/spring/spring-original.svg?raw";
import nodejsSvg from "devicon/icons/nodejs/nodejs-plain.svg?raw";
import fastapiSvg from "devicon/icons/fastapi/fastapi-plain.svg?raw";
import railsSvg from "devicon/icons/rails/rails-plain.svg?raw";
import nextjsSvg from "devicon/icons/nextjs/nextjs-plain.svg?raw";
import reactSvg from "devicon/icons/react/react-original.svg?raw";
import astroSvg from "devicon/icons/astro/astro-plain.svg?raw";
import tailwindSvg from "devicon/icons/tailwindcss/tailwindcss-original.svg?raw";
import postgresqlSvg from "devicon/icons/postgresql/postgresql-plain.svg?raw";
import dockerSvg from "devicon/icons/docker/docker-plain.svg?raw";
import gitSvg from "devicon/icons/git/git-plain.svg?raw";
import githubActionsSvg from "devicon/icons/githubactions/githubactions-plain.svg?raw";
import linuxSvg from "devicon/icons/linux/linux-plain.svg?raw";
import awsSvg from "devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg?raw";

export type TechItem = { name: string; svg: string };
export type StackCategory = { name: string; items: TechItem[] };

export const stack: StackCategory[] = [
  {
    name: "Linguagens",
    items: [
      { name: "TypeScript", svg: typescriptSvg },
      { name: "Java", svg: javaSvg },
      { name: "Python", svg: pythonSvg },
      { name: "Ruby", svg: rubySvg },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", svg: nodejsSvg },
      { name: "Spring Boot", svg: springSvg },
      { name: "FastAPI", svg: fastapiSvg },
      { name: "Ruby on Rails", svg: railsSvg },
      { name: "PostgreSQL", svg: postgresqlSvg },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "Next.js", svg: nextjsSvg },
      { name: "React", svg: reactSvg },
      { name: "Astro", svg: astroSvg },
      { name: "Tailwind CSS", svg: tailwindSvg },
    ],
  },
  {
    name: "Infra & DevOps",
    items: [
      { name: "Docker", svg: dockerSvg },
      { name: "AWS", svg: awsSvg },
      { name: "Git", svg: gitSvg },
      { name: "GitHub Actions", svg: githubActionsSvg },
      { name: "Linux", svg: linuxSvg },
    ],
  },
];

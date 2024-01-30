import Button from '@/components/button';
import { CarreerButton } from '@/components/carreer-button';
import Job from '@/components/job';
import Section from '@/components/section';
import SocialNetworks from '@/components/social-networks';
import { jobs } from '@/content/carreer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Article, ReadCvLogo } from '@phosphor-icons/react';
import Image from 'next/image';
import Script from 'next/script';

interface HomeProps {
  googleAnalyticsId: string;
}

export default function Home({ googleAnalyticsId }: HomeProps) {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
      <section className="flex flex-col lg:flex-row gap-6 lg:gap-x-10 min-h-[80vh]">
        <div className="my-8 flex flex-col gap-6 lg:gap-8 lg:w-1/2 h-full">
          <Image
            className="rounded-full"
            src="https://github.com/wcardosos.png?size=256"
            alt="Wagner Cardoso profile"
            width={192}
            height={192}
          />
          <div>
            <h1 className="text-brand-red text-3xl font-bold mt-2">
              Wagner Cardoso
            </h1>
            <span className="text-lg text-gray-200">Desenvolvedor Web Fullstack</span>
            <p className="text-gray-100 mt-2">Apaixonado por programação e por usar a tecnologia para criar soluções inovadoras. Possuo experiência em diversas tecnologias, incluindo Node.js, React, Python, Ruby on Rails e Vue.js.</p>
          </div>
          <SocialNetworks />
        </div>
        <div className="grid gap-y-2 lg:gap-y-6 lg:w-1/2 h-full my-auto">
          <a
            href="#carreer"
            rel="noreferrer"
          >
            <CarreerButton text="Minha carreira" icon={ReadCvLogo} />
          </a>
          {/* <CarreerButton text="Minhas habilidades" icon={CodeBlock} /> */}
          <a
            href="https://blog.wagnercardoso.dev"
            target="_blank"
            rel="noreferrer"
          >
            <CarreerButton text="Acesse meu blog" icon={Article} /> 
          </a>
        </div>
      </section>

      <Section title="Minha carreira" id="carreer">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 lg:justify-center">
          {jobs.map((job) => (
            <Job
              key={job.carreerMoment}
              companyName={job.companyName}
              companyLogo={job.companyLogo}
              role={job.role}
              description={job.description}
              technologies={job.technologies}
              startMonth={job.startMonth}
              endMonth={job.endMonth}
            />
          ))}
        </div>
      </Section>

      <Section title="Blog">
        <p>
          Em meu blog compartilho minhas experiências neste mundo fantástico da
          programação.
        </p>
        <div className="flex justify-center mt-6 lg:mt-8">
          <a
            href="https://blog.wagnercardoso.dev"
            target="_blank"
            rel="noreferrer"
          >
            <Button>Acessar blog</Button>
          </a>
        </div>
      </Section>

      <Section title="Contato">
        <p>
          Curtiu o que viu e quer entrar em contato? Clique no botão abaixo e
          fale comigo.
        </p>
        <div className="flex justify-center mt-6 lg:mt-8">
          <a href="mailto:wagnerdev01@gmail.com">
            <Button>Entrar em contato</Button>
          </a>
        </div>
      </Section>

      <Section title="Sobre mim">
        <p>
          Meu nome é Wagner Cardoso e tenho 25 anos. Sou um desenvolvedor
          fullstack apaixonado por programação e por usar a tecnologia para
          criar soluções inovadoras. Possuo experiência em diversas tecnologias,
          incluindo <strong>Node.js</strong>, <strong>React</strong>,{' '}
          <strong>Python</strong>, <strong>Ruby on Rails</strong> e{' '}
          <strong>Vue.js</strong>.
        </p>
        <br />
        <p>
          Ao longo da minha carreira, tive a oportunidade de trabalhar em
          diversos projetos desafiadores e gratificantes. Meu maior sonho é usar
          ajudar as pessoas por meio da tecnologia e me sinto muito grato de
          realizar esse sonho todos os dias.
        </p>
        <br />
        <p>
          Estou sempre em busca de novas oportunidades de aprendizado e
          crescimento profissional. Se você compartilha da mesma paixão pela
          tecnologia ou está interessado em colaborar em projetos incríveis,
          fique à vontade para entrar em contato.
        </p>
      </Section>
    </>
  );
}

export async function getStaticProps() {
  const { GOOGLE_ANALYTICS_ID } = process.env;

  return {
    props: {
      googleAnalyticsId: GOOGLE_ANALYTICS_ID,
    },
  };
}

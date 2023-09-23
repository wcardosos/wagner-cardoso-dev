import Button from '@/components/button';
import Footer from '@/components/footer';
import Job from '@/components/job';
import Section from '@/components/section';
import SocialNetworks from '@/components/social-networks';
import { jobs } from '@/content/carreer';
import Image from 'next/image';
import Script from 'next/script';
import React from 'react';

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
      <section>
        <div className="my-8 lg:my-16 flex flex-col lg:flex-row lg:justify-center gap-4 lg:gap-8">
          <div className="flex justify-center">
            <Image
              className="rounded-full"
              src="https://github.com/wcardosos.png?size=256"
              alt="Wagner Cardoso profile"
              width={256}
              height={256}
            />
          </div>
          <div className="my-auto">
            <h1 className="text-brand-red text-3xl font-bold my-2">
              Olá, eu sou o Wagner!
            </h1>
            <span className="text-lg">Desenvolvedor Fullstack</span>
          </div>
        </div>
        <SocialNetworks />
      </section>

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

      <Section title="Carreira">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 lg:justify-center">
          {jobs.map((job) => (
            <Job
              key={job.carreerMoment}
              companyName={job.companyName}
              companyLogo={job.companyLogo}
              role={job.role}
              description={job.description}
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
          <a href="https://blog.wagnercardoso.dev" target="_blank">
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

      <Footer />
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

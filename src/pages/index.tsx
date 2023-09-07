import Job from '@/components/job';
import SocialNetworks from '@/components/social-networks';
import { jobs } from '@/content/carreer';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <>
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

      <section className="mt-16 lg:mt-24">
        <h1 className="text-2xl font-bold text-brand-red mb-6">Sobre mim</h1>
        <div>
          <p>
            Meu nome é Wagner Cardoso e tenho 25 anos. Sou um desenvolvedor
            fullstack apaixonado por programação e por usar a tecnologia para
            criar soluções inovadoras. Possuo experiência em diversas
            tecnologias, incluindo Node.js, React, Python, Ruby on Rails e
            Vue.js.
          </p>
          <br />
          <p>
            Ao longo da minha carreira, tive a oportunidade de trabalhar em
            diversos projetos desafiadores e gratificantes. Meu maior sonho é
            usar ajudar as pessoas por meio da tecnologia e me sinto muito grato
            de realizar esse sonho todos os dias.
          </p>
          <br />
          <p>
            Estou sempre em busca de novas oportunidades de aprendizado e
            crescimento profissional. Se você compartilha da mesma paixão pela
            tecnologia ou está interessado em colaborar em projetos incríveis,
            fique à vontade para entrar em contato.
          </p>
        </div>
      </section>

      <section className="mt-16 lg:mt-20">
        <h1 className="text-2xl font-bold text-brand-red mb-6">Carreira</h1>
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
      </section>
    </>
  );
}

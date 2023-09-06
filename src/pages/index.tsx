import SocialNetworks from '@/components/social-networks';
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
    </>
  );
}

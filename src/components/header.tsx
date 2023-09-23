import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between">
      <a href="/">
        <img className="w-12 h-12 lg:w-16 lg:h-16" src="/assets/logo.webp" />
      </a>
    </header>
  );
}

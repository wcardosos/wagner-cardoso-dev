import React from 'react';

export default function SocialNetworks() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <a href="mailto:wagnerdev01@gmail.com" target="_blank">
        <img className="w-6 h-6 lg:w-8 lg:h-8" src="/assets/gmail-icon.webp" />
      </a>
      <a href="https://github.com/wcardosos" target="_blank">
        <img className="w-6 h-6 lg:w-8 lg:h-8" src="/assets/github-icon.webp" />
      </a>
      <a href="https://linkedin.com/in/wagner-cardoso-dev" target="_blank">
        <img
          className="w-6 h-6 lg:w-8 lg:h-8"
          src="/assets/linkedin-icon.webp"
        />
      </a>
    </div>
  );
}

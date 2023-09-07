import React from 'react';

interface JobProps {
  companyName: string;
  companyLogo: string;
  role: string;
  description: string;
  startMonth: string;
  endMonth: string;
}

export default function Job({
  companyName,
  companyLogo,
  role,
  description,
  startMonth,
  endMonth,
}: JobProps) {
  return (
    <div className="max-w-sm py-6 px-4 bg-brand-black-light rounded drop-shadow-md">
      <div className="flex flex-col gap-4 mb-6">
        <strong className="text-lg">{role}</strong>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="flex gap-4">
        <img className="max-w-10 h-10" src={companyLogo} />
        <div>
          <strong>{companyName}</strong>
          <p className="text-sm">
            {startMonth} - {endMonth}
          </p>
        </div>
      </div>
    </div>
  );
}

interface JobProps {
  companyName: string;
  companyLogo: string;
  role: string;
  description: {
    text: string
    impactPoints: string[]
  };
  technologies: string[]
  startMonth: string;
  endMonth: string;
}

export default function Job({
  companyName,
  companyLogo,
  role,
  description,
  technologies,
  startMonth,
  endMonth,
}: JobProps) {
  return (
    <div className="max-w-lg py-6 px-4 bg-brand-black-light rounded drop-shadow-md">
      <div className="flex flex-col gap-4 mb-6">
        <strong className="text-lg">{role}</strong>
        <p className="text-gray-300">{description.text}</p>
        <ul className="list-disc text-gray-300 text-sm pl-8">
          {description.impactPoints.map((point, index) => <li key={index}>{point}</li>)}
        </ul>
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
      <div className="text-sm mt-6">
        <p><strong>Tecnologias:</strong> {technologies.join(', ')}</p>
      </div>
    </div>
  );
}

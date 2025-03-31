interface SectionCardProps {
  title: string;
  description: string;
  buttonText: string;
}

const SectionCard = ({ title, description, buttonText }: SectionCardProps) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="bg-[#222222] rounded-xl p-16">
        <p className="text-sm leading-relaxed mb-8">{description}</p>
        <div className="flex justify-center">
          <button className="bg-[#FF6D01] hover:bg-[#842800] text-white font-medium rounded px-4 py-2 mt-4">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;

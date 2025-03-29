interface InpuBoxProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
}

export default function InpuBox({
  type,
  placeholder,
  icon = <span className="text-gray-400 text-lg">✔</span>,
}: InpuBoxProps) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded border border-[#161616] placeholder:text-[#777]"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {icon}
      </span>
    </div>
  );
}

interface InputBoxProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputBox({
  type,
  placeholder,
  icon = <span className="text-gray-400 text-lg">✔</span>,
  value,
  onChange,
  error,
}: InputBoxProps) {
  return (
    <>
      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded 
            border placeholder:text-[#777] 
            ${error ? 'border-[#EE3535]' : 'border-[#161616]'}`}
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {icon}
        </span>
      </div>
      {error && (
        <p className="text-[#EE3535] text-[14px] mt-1 ml-1">{error}</p>
      )}
    </>
  );
}

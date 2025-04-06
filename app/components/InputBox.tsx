interface InputBoxProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  successHighlight?: boolean; 
}

export default function InputBox({
  type,
  placeholder,
  value,
  onChange,
  error,
  successHighlight = false, 
}: InputBoxProps) {
  const isSuccess = successHighlight && !error && value?.trim();

  return (
    <>
      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded 
            border placeholder:text-[#777] transition
            ${
              error
                ? 'border-[#EE3535]'
                : isSuccess
                ? 'border-[#00C851]'
                : 'border-[#161616]'
            }`}
        />
        <span
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition 
            ${error ? 'text-[#EE3535]' : isSuccess ? 'text-[#00C851]' : 'text-gray-400'}`}
        >
          ✔
        </span>
      </div>
      {error && (
        <p className="text-[#EE3535] text-[14px] mt-1 ml-1">{error}</p>
      )}
    </>
  );
}

interface InputBoxProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  successHighlight?: boolean;
}

const InputBox = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  successHighlight = false,
}: InputBoxProps) => {
  const isSuccess = successHighlight && !error && value?.trim();

  return (
    <>
      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full text-[16px] px-4 py-2 h-[44px] bg-[#161616] text-white rounded 
            border placeholder:text-[#777] transition
            ${
              error
                ? 'border-error'
                : isSuccess
                  ? 'border-success'
                  : 'border-[#161616]'
            }`}
        />
        <span
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition 
            ${error ? 'text-error' : isSuccess ? 'text-success' : 'text-gray-400'}`}
        >
          ✔
        </span>
      </div>
      {error && <p className="text-error text-[14px] mt-1 ml-1">{error}</p>}
    </>
  );
};

export default InputBox;

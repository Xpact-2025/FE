interface InputBoxProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputBox = ({
  type,
  placeholder,
  value,
  onChange,
  error,
}: InputBoxProps) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full text-[16px] px-4 py-2 h-[44px] bg-[#161616] text-white rounded
            border placeholder:text-[#777] transition
            ${error ? 'border-error' : 'border-[#161616]'}`}
      />
      {error && <p className="text-error text-[14px] mt-1 ml-1">{error}</p>}
    </>
  );
};

export default InputBox;

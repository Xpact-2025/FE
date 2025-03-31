import React from "react";

interface InputBoxProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  type,
  placeholder,
  icon = <span className="text-gray-400 text-lg">✔</span>,
  value,
  onChange,
}: InputBoxProps) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded border border-[#161616] placeholder:text-[#777]"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {icon}
      </span>
    </div>
  );
}

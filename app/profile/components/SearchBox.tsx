import SearchProfileIcon from '@/public/icons/Search_Profile.svg';

interface SearchInputProps {
  placeholder: string;
  onSearch?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

//엔터 키 처리 추가
export default function SearchInput({
  placeholder,
  onSearch,
  value,
  onChange,
}: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="w-full h-[44px] px-4 py-2 bg-[#161616] text-white rounded border border-gray-700"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={onSearch}
      >
        <SearchProfileIcon />
      </button>
    </div>
  );
}

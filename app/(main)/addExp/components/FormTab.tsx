import { ExpFormType } from '@/types/exp';

interface FormTabProps {
  onChange: (value: {
    formType: ExpFormType;
    selectedTab: 'star' | 'simple';
  }) => void;
  selectedTab: 'star' | 'simple';
}

export default function FormTab({ onChange, selectedTab }: FormTabProps) {
  const handleTabChange = (tab: 'star' | 'simple') => {
    onChange({
      formType: tab === 'star' ? 'STAR_FORM' : 'SIMPLE_FORM',
      selectedTab: tab,
    });
  };

  return (
    <div className="flex justify-between gap-2.5 text-sm font-semibold">
      <button
        type="button"
        className={`w-[460px] rounded-lg py-3.5 transition all hover:bg-primary-50 hover:text-gray-800 ${
          selectedTab === 'star'
            ? 'bg-primary-50 text-gray-800'
            : 'bg-gray-800 text-gray-300 outline outline-gray-50-10'
        }`}
        onClick={() => handleTabChange('star')}
      >
        STAR 양식
      </button>
      <button
        type="button"
        className={`w-[460px] rounded-lg py-3.5 transition all hover:bg-primary-50 hover:text-gray-800 ${
          selectedTab === 'simple'
            ? 'bg-primary-50 text-gray-800'
            : 'bg-gray-800 text-gray-300 outline outline-gray-50-10'
        }`}
        onClick={() => handleTabChange('simple')}
      >
        간결 양식
      </button>
    </div>
  );
}

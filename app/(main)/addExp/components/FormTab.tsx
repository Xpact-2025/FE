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
    <div className="flex justify-between gap-2.5">
      <button
        type="button"
        className={`w-[460px] rounded-lg text-sm font-semibold py-3.5 transition all ${
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
        className={`w-[460px] rounded-lg text-sm font-semibold py-3.5 transition all ${
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

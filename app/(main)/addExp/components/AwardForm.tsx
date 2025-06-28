import ExpInputBox from './ExpInputBox';
import KeywordInput from './KeywordInput';

interface AwardFormProps {
  data: {
    subTitle: string;
    simpleDescription: string;
    keywords: string[];
  };
  onChange: (key: string, value: string | string[]) => void;
}

export default function AwardForm({ data, onChange }: AwardFormProps) {
  const handleChange = (key: string, value: string | string[]) => {
    onChange(key, value);
  };

  return (
    <div className="mt-[-30px]">
      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        세부 경험 제목
      </div>
      <ExpInputBox
        type="string"
        placeholder="제목"
        value={data.subTitle}
        onChange={e => handleChange('subTitle', e.target.value)}
      />

      <div className="py-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          간단 설명
        </div>
        <ExpInputBox
          type="textarea"
          placeholder="간단 설명"
          value={data.simpleDescription}
          onChange={e => handleChange('simpleDescription', e.target.value)}
        />
      </div>

      <div className="pb-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          키워드
        </div>
        <KeywordInput
          value={data.keywords}
          onChange={newTags => handleChange('keywords', newTags)}
        />
      </div>
    </div>
  );
}

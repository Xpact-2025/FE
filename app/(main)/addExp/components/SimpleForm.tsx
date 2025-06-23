import ExpInputBox from './ExpInputBox';
import KeywordInput from './KeywordInput';
import FileInput from './FileInput';

interface SimpleFormProps {
  data: {
    subTitle: string;
    role: string;
    perform: string;
    keywords: string[];
  };
  onChange: (key: string, value: string | string[]) => void;
}

export default function SimpleForm({ data, onChange }: SimpleFormProps) {
  const handleChange = (key: string, value: string | string[]) => {
    onChange(key, value);
  };

  return (
    <div className="pb-[30px]">
      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        세부 경험 제목
      </div>
      <ExpInputBox
        type="string"
        placeholder="제목"
        value={data.subTitle}
        onChange={e => handleChange('subTitle', e.target.value)}
      />

      <div className="py-15">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          역할
        </div>
        <ExpInputBox
          type="textarea"
          placeholder="본인이 맡은 역할이나 담당한 업무는 무엇이었나요?"
          value={data.role}
          onChange={e => handleChange('role', e.target.value)}
        />
      </div>

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        주요 성과
      </div>
      <ExpInputBox
        type="textarea"
        placeholder="해당 경험에서 달성한 결과나 성과는 무엇이었나요?"
        value={data.perform}
        onChange={e => handleChange('perform', e.target.value)}
      />

      <div className="py-15">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          자료 첨부(선택)
        </div>
        <FileInput />
      </div>

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        키워드
      </div>
      <KeywordInput
        value={data.keywords}
        onChange={newTags => handleChange('keywords', newTags)}
      />
    </div>
  );
}

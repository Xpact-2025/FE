import { ExpType } from '@/types/exp';
import ExpInputBox from './ExpInputBox';

interface AwardFormProps {
  experienceType?: ExpType;
  data: {
    qualification: string;
    publisher: string;
    issueDate: string;
    simpleDescription: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function AwardForm({
  experienceType,
  data,
  onChange,
}: AwardFormProps) {
  const handleChange = (key: string, value: string) => {
    onChange(key, value);
  };

  return (
    <div className="mt-[-30px]">
      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        {experienceType === 'CERTIFICATES' ? '자격증명' : '수상명'}
      </div>
      <ExpInputBox
        type="string"
        placeholder={experienceType === 'CERTIFICATES' ? '자격증명' : '수상명'}
        value={data.qualification}
        onChange={e => handleChange('qualification', e.target.value)}
      />

      <div className="py-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          {experienceType === 'CERTIFICATES' ? '발행처' : '대회명 / 주최기관'}
        </div>
        <ExpInputBox
          type="string"
          placeholder={
            experienceType === 'CERTIFICATES' ? '발행처' : '대회명 / 주최기관'
          }
          value={data.publisher}
          onChange={e => handleChange('publisher', e.target.value)}
        />
      </div>

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        {experienceType === 'CERTIFICATES' ? '취득일' : '수상일'}
      </div>
      <ExpInputBox
        type="date"
        value={data.issueDate}
        onChange={e => handleChange('issueDate', e.target.value)}
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
    </div>
  );
}

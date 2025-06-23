import ExpInputBox from './ExpInputBox';
import KeywordInput from './KeywordInput';
import FileInput from './FileInput';

interface StarFormProps {
  data: {
    subTitle: string;
    situation: string;
    task: string;
    action: string;
    result: string;
    keywords: string[];
  };
  onChange: (key: string, value: string | string[]) => void;
}

export default function StarForm({ data, onChange }: StarFormProps) {
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
          상황
        </div>
        <ExpInputBox
          type="textarea"
          placeholder="어떤 배경에서 활동을 하게 되었나요?"
          value={data.situation}
          onChange={e => handleChange('situation', e.target.value)}
        />
      </div>

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        문제
      </div>
      <ExpInputBox
        type="textarea"
        placeholder="그 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?"
        value={data.task}
        onChange={e => handleChange('task', e.target.value)}
      />

      <div className="py-15">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          행동
        </div>
        <ExpInputBox
          type="textarea"
          placeholder="그 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?"
          value={data.action}
          onChange={e => handleChange('action', e.target.value)}
        />
      </div>

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        결과
      </div>
      <ExpInputBox
        type="textarea"
        placeholder="그 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?"
        value={data.result}
        onChange={e => handleChange('result', e.target.value)}
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

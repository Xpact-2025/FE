'use client';

import { ExpPayload, SubExperience } from '@/apis/exp';
import Image from 'next/image';
import KeywordInput from '../../addExp/components/KeywordInput';
import FileInput from '../../addExp/components/FileInput';

interface ExpDetailContentProps {
  data: ExpPayload;
  subData: SubExperience;
  isEditing?: boolean;
  onChange?: (field: keyof SubExperience, value: string | string[]) => void;
}

export default function ExpDetailContent({
  data,
  subData,
  isEditing = false,
  onChange = () => {},
}: ExpDetailContentProps) {
  const isSpecial = ['PRIZE', 'CERTIFICATES'].includes(data.experienceType);

  const renderInput = (
    label: string,
    field: keyof SubExperience,
    multiline = false
  ) => (
    <div className="mb-6">
      <p className="mb-2">{label}</p>
      {multiline ? (
        <textarea
          value={subData[field] || ''}
          onChange={e => onChange(field, e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white min-h-[50px]"
        />
      ) : (
        <input
          type="text"
          value={subData[field] || ''}
          onChange={e => onChange(field, e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
      )}
    </div>
  );

  const renderSpecial = () => (
    <div className="bg-[#161616] p-3 rounded-[4px] space-y-4">
      {isEditing
        ? renderInput('', 'simpleDescription', true)
        : subData.simpleDescription && <p>{subData.simpleDescription}</p>}
    </div>
  );

  const renderSimple = () => (
    <div className="bg-[#161616] p-3 rounded-[4px]">
      {isEditing ? (
        <>
          {renderInput('역할', 'role')}
          {renderInput('주요 성과', 'perform', true)}
        </>
      ) : (
        <>
          {subData.role && (
            <>
              <p className="font-semibold text-[18px]">역할</p>
              <p className="mb-6">{subData.role}</p>
            </>
          )}
          {subData.perform && (
            <>
              <p className="font-semibold text-[18px]">주요 성과</p>
              <p className="mb-2">{subData.perform}</p>
            </>
          )}
        </>
      )}
    </div>
  );

  const renderSTAR = () => (
    <div className="bg-[#161616] p-3 rounded-[4px]">
      {isEditing ? (
        <>
          {renderInput('상황', 'situation', true)}
          {renderInput('문제', 'task', true)}
          {renderInput('해결 방법', 'action', true)}
          {renderInput('결과', 'result', true)}
        </>
      ) : (
        <>
          {subData.situation && (
            <>
              <p className="font-semibold text-[18px]">상황 (Situation)</p>
              <p className="mb-6 mt-2">{subData.situation}</p>
            </>
          )}
          {subData.task && (
            <>
              <p className="font-semibold text-[18px]">문제 (Task)</p>
              <p className="mb-6 mt-2">{subData.task}</p>
            </>
          )}
          {subData.action && (
            <>
              <p className="font-semibold text-[18px]">행동 (Action)</p>
              <p className="mb-6 mt-2">{subData.action}</p>
            </>
          )}
          {subData.result && (
            <>
              <p className="font-semibold text-[18px]">결과 (Result)</p>
              <p className="mb-2 mt-2">{subData.result}</p>
            </>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="bg-gray-700 mt-0 rounded-b-[14px] rounded-tr-[14px]  p-6 space-y-4 leading-relaxed relative z-10">
      {isEditing ? (
        <>
          <div className="text-[21px] font-semibold text-white mb-4">
            세부 경험 제목
          </div>
          <input
            type="text"
            value={subData.subTitle || ''}
            onChange={e => onChange('subTitle', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </>
      ) : (
        subData.subTitle && (
          <>
            <div className="text-[21px] font-semibold text-white mb-4">
              세부 경험 제목
            </div>
            <div className="bg-[#161616] p-3 rounded-[4px]">
              {subData.subTitle}
            </div>
          </>
        )
      )}

      <div className="text-[21px] font-semibold text-white mb-4 mt-10">
        {isSpecial ? '간단 설명' : '내용'}
      </div>
      {isSpecial
        ? renderSpecial()
        : subData.formType === 'SIMPLE_FORM'
          ? renderSimple()
          : renderSTAR()}

      {Array.isArray(subData.files) && subData.files.length > 0 && (
        <div className="mt-10">
          <h3 className="text-[21px] font-semibold text-white mb-4 mt-10">
            자료 첨부
          </h3>
          <div className="bg-gray-700 rounded-[4px] space-y-3">
            {subData.files.map((file, idx) => (
              <div
                key={idx}
                className=" bg-gray-600 rounded-md px-3 py-2 text-sm text-gray-200 flex items-center gap-2"
              >
                <Image
                  src="/images/file.svg"
                  alt="file"
                  width={14}
                  height={18}
                />
                {file}
              </div>
            ))}
          </div>
        </div>
      )}

      {isEditing && (
        <div className="mt-10">
          <h3 className="text-[21px] font-semibold text-white mb-4">
            파일 추가
          </h3>
          <FileInput
            onFileChange={newFiles => onChange('files', newFiles)}
            initialFiles={subData.files} // 추가
          />{' '}
        </div>
      )}

      {Array.isArray(subData.keywords) && (
        <div className="mt-10">
          <h3 className="text-[21px] font-semibold text-white mb-4 mt-10">
            키워드
          </h3>
          <div className="bg-[#161616] p-3 rounded-[4px]">
            {isEditing ? (
              <KeywordInput
                value={subData.keywords}
                onChange={newKeywords => onChange('keywords', newKeywords)}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {subData.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1 bg-gray-300 text-sm rounded-full text-gray-1100"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

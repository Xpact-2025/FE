import { useRouter } from 'next/navigation';
import CloseIcon from '@/public/icons/Close.svg';
import ExpInputBox from './ExpInputBox';
import { ExpPayload } from '@/apis/exp';

interface AddExpModalProps {
  form: ExpPayload;
  onChange: (key: string, value: string) => void;
  onClose: () => void;
}

export default function AddExpModal({
  form,
  onChange,
  onClose,
}: AddExpModalProps) {
  const router = useRouter();

  const validateForm = () => {
    if (!form.experienceType) return false;

    if (
      form.experienceType === 'CERTIFICATES' ||
      form.experienceType === 'PRIZE'
    ) {
      if (!form.qualification || !form.publisher || !form.issueDate) {
        return false;
      }
    } else {
      if (!form.title || !form.startDate || !form.endDate) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[1025px] max-h-[90vh] bg-gray-700 rounded-[19.5px] outline outline-gray-50-20 p-10">
        <div className="flex justify-end">
          <CloseIcon onClick={onClose} />
        </div>
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          경험 유형
        </div>
        <ExpInputBox
          type="select"
          value={form.experienceType}
          onChange={e => {
            const newType = e.target.value;
            onChange('experienceType', newType);
          }}
        />

        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%] pt-7">
          {form.experienceType === 'CERTIFICATES'
            ? '자격증명'
            : form.experienceType === 'PRIZE'
              ? '수상명'
              : '경험 제목'}
        </div>
        {form.experienceType === 'CERTIFICATES' ? (
          <div>
            <ExpInputBox
              type="string"
              placeholder="ex) ADsP (데이터분석준전문가)"
              value={form.qualification ?? ''}
              onChange={e => onChange('qualification', e.target.value)}
            />
            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%] pt-7">
              발행처
            </div>
            <ExpInputBox
              type="string"
              placeholder="ex) 한국데이터산업진흥원"
              value={form.publisher ?? ''}
              onChange={e => onChange('publisher', e.target.value)}
            />
          </div>
        ) : form.experienceType === 'PRIZE' ? (
          <div>
            <ExpInputBox
              type="string"
              placeholder="ex) 최우수상"
              value={form.qualification ?? ''}
              onChange={e => onChange('qualification', e.target.value)}
            />
            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%] pt-7">
              대회명/주최기관
            </div>
            <ExpInputBox
              type="string"
              placeholder="ex) 제2회 디지털 혁신 서비스 공모전 / XPact"
              value={form.publisher ?? ''}
              onChange={e => onChange('publisher', e.target.value)}
            />
          </div>
        ) : (
          <ExpInputBox
            type="string"
            placeholder="ex) UX/UI 서비스 디자인 공모전"
            value={form.title ?? ''}
            onChange={e => onChange('title', e.target.value)}
          />
        )}

        {['CERTIFICATES', 'PRIZE'].includes(form.experienceType) ? (
          <div className="py-7">
            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
              날짜
            </div>
            <ExpInputBox
              type="date"
              value={form.issueDate ?? ''}
              onChange={e => {
                const date = e.target.value;
                onChange('issueDate', date);
                onChange('startDate', date);
                onChange('endDate', date);
              }}
            />
          </div>
        ) : (
          <div className="py-10">
            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
              기간
            </div>
            <div className="flex gap-4">
              <ExpInputBox
                type="date"
                value={form.startDate ?? ''}
                max={form.endDate}
                onChange={e => onChange('startDate', e.target.value)}
              />
              <ExpInputBox
                type="date"
                value={form.endDate ?? ''}
                min={form.startDate}
                onChange={e => onChange('endDate', e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            className="flex justify-center w-72 px-52 py-4 bg-primary-50 hover:bg-primary-100 font-body-23-b font-bold rounded-lg whitespace-nowrap"
            onClick={() => {
              if (!validateForm()) {
                alert('모든 항목을 입력해주세요.');
                return;
              }
              localStorage.setItem('draftForm', JSON.stringify(form));
              router.push('/addExp');
            }}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

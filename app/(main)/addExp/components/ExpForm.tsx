'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { editExp, saveExp, SubExperience, type ExpPayload } from '@/apis/exp';
import FormTab from './FormTab';
import Popup from '@/app/components/Popup';
import GuideModal from './GuideModal';
import Footer from '@/app/components/Footer';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import { ExpFormType, ExpType } from '@/types/exp';
import AwardForm from './AwardForm';
import StarForm from './StarForm';
import SimpleForm from './SimpleForm';
import PlusGrayIcon from '@/public/icons/PlusIcon_gray.svg';
import CloseIcon from '@/public/icons/Close_small.svg';

interface ExpFormProps {
  data?: ExpPayload & { subExperiencesResponseDto: SubExperience[] };
}

const getInitialForm = (
  data?: ExpPayload & { subExperiencesResponseDto?: SubExperience[] }
) => {
  const sub = data?.subExperiencesResponseDto?.[0];

  return {
    subExperiences: data?.subExperiencesResponseDto || [],
    selectedTab:
      sub?.formType === 'STAR_FORM'
        ? 'star'
        : sub?.formType === 'SIMPLE_FORM'
          ? 'simple'
          : 'star',
    status: sub?.status || 'SAVE',
    formType: sub?.formType || 'STAR_FORM',
    uploadType: sub?.uploadType || 'FILE',
    experienceType: data?.experienceType || ('' as ExpType),
    qualification: data?.qualification || '',
    publisher: data?.publisher || '',
    issueDate: data?.issueDate || '',
    simpleDescription: sub?.simpleDescription || '',
    title: data?.title || '',
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    subTitle: sub?.subTitle || '',
    tabName: sub?.tabName || '',
    role: sub?.role || '',
    perform: sub?.perform || '',
    situation: sub?.situation || '',
    task: sub?.task || '',
    action: sub?.action || '',
    result: sub?.result || '',
    files: sub?.files || [],
    keywords: sub?.keywords || [],
    id: data?.id,
    subId: sub?.subExperienceId,
  };
};

export default function ExpForm({ data }: ExpFormProps) {
  const router = useRouter();
  const [forms, setForms] = useState([getInitialForm(data)]);
  const [tab, setTab] = useState<'star' | 'simple'>('star');
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingFormType, setPendingFormType] = useState<ExpFormType | null>(
    null
  );

  const form = forms[activeFormIndex];
  useEffect(() => {
    const saved = localStorage.getItem('draftForm');
    if (saved) {
      const parsed = JSON.parse(saved);
      setForms([getInitialForm(parsed)]);
      setActiveFormIndex(0);
      localStorage.removeItem('draftForm');
    }
  }, []);

  const handleAddExperienceTab = (currentExperienceType: ExpType) => {
    const newForm = {
      ...getInitialForm(undefined),
      formType: 'STAR_FORM' as ExpFormType,
      selectedTab: 'star',
      experienceType: currentExperienceType,
      qualification: '',
      publisher: '',
      issueDate: '',
      simpleDescription: '',
      title: '',
      startDate: '',
      endDate: '',
      subTitle: '',
      role: '',
      perform: '',
      situation: '',
      task: '',
      action: '',
      result: '',
      files: [],
      keywords: [],
      subId: undefined,
    };
    setForms(prev => {
      const updatedForms = [...prev, newForm];
      setActiveFormIndex(updatedForms.length - 1);
      return updatedForms;
    });
    setTab('star');
  };

  const handleRemoveExperienceTab = (indexToRemove: number) => {
    setForms(prev => {
      const updatedForms = prev.filter((_, idx) => idx !== indexToRemove);

      if (activeFormIndex === indexToRemove) {
        if (indexToRemove === prev.length - 1) {
          setActiveFormIndex(indexToRemove - 1 >= 0 ? indexToRemove - 1 : 0);
        } else {
          setActiveFormIndex(indexToRemove);
        }
      } else if (activeFormIndex > indexToRemove) {
        setActiveFormIndex(activeFormIndex - 1);
      }

      return updatedForms;
    });
  };

  const handleDoubleClickTab = (index: number) => {
    setEditingIndex(index);
    setEditingValue(forms[index].tabName || `경험 ${index + 1}`);
  };

  const handleSaveTabName = (index: number) => {
    setForms(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        tabName:
          editingValue.trim() === ''
            ? `경험 ${index + 1}`
            : editingValue.trim(),
      };
      return updated;
    });
    setEditingIndex(null);
  };

  const isFormChanged = () => {
    const keysToCompare = [
      'qualification',
      'publisher',
      'issueDate',
      'simpleDescription',
      'title',
      'startDate',
      'endDate',
      'role',
      'perform',
      'situation',
      'task',
      'action',
      'result',
      'files',
      'keywords',
    ] as (keyof ExpPayload)[];

    if (!data) {
      const allEmpty = keysToCompare.every(key => {
        const val = form[key as keyof typeof form];
        if (val === undefined || val === null) return true;
        if (typeof val === 'string' && val.trim() === '') return true;
        if (Array.isArray(val) && val.length === 0) return true;
        return false;
      });
      return !allEmpty;
    }

    return keysToCompare.some(key => {
      return (
        JSON.stringify(form[key as keyof typeof form]) !==
        JSON.stringify(data[key])
      );
    });
  };

  const confirmTabChange = () => {
    if (pendingFormType) {
      setForms(prev => {
        const updated = [...prev];
        updated[activeFormIndex] = {
          ...updated[activeFormIndex],
          formType: pendingFormType,
          selectedTab: pendingFormType === 'STAR_FORM' ? 'star' : 'simple',
        };
        return updated;
      });
      setPendingFormType(null);
      setIsPopupOpen(false);
    }
  };

  const handleTabChange = (value: {
    formType: ExpFormType;
    selectedTab: 'star' | 'simple';
  }) => {
    if (isFormChanged()) {
      setPendingFormType(value.formType);
      setIsPopupOpen(true);
    } else {
      setForms(prev => {
        const updated = [...prev];
        updated[activeFormIndex] = {
          ...updated[activeFormIndex],
          formType: value.formType,
          selectedTab: value.selectedTab,
        };
        return updated;
      });
    }
  };

  const handleChange = (key: string, value: string | string[]) => {
    setForms(prev => {
      const updated = [...prev];
      updated[activeFormIndex] = { ...updated[activeFormIndex], [key]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ExpPayload = {
      ...form,
      issueDate: form.issueDate
        ? new Date(form.issueDate).toISOString()
        : undefined,
      startDate: form.startDate
        ? new Date(form.startDate).toISOString()
        : undefined,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
      subExperiences: forms.map(f => ({ ...f })),
    };

    const { httpStatus, message } = form.id
      ? await editExp(form.id, {
          ...payload,
          subExperiences: form.subExperiences,
        })
      : await saveExp({
          ...payload,
          subExperiences: form.subExperiences || [],
        });

    if (httpStatus == 200) {
      alert('성공적으로 저장되었습니다!');
      router.push('/exp');
    } else {
      alert(`저장 실패: ${message}`);
      console.log('보내는 payload:', payload);
    }
  };

  const renderForm = () => {
    if (
      form.experienceType === 'CERTIFICATES' ||
      form.experienceType === 'PRIZE'
    ) {
      return <AwardForm data={form} onChange={handleChange} />;
    }
    if (form.formType === 'STAR_FORM') {
      return <StarForm data={form} onChange={handleChange} />;
    }
    return <SimpleForm data={form} onChange={handleChange} />;
  };

  return (
    <form onSubmit={handleSubmit} className="p-20">
      <div className="flex items-center pb-[50px]">
        <button
          type="button"
          onClick={() => {
            setPendingFormType(null);
            setIsPopupOpen(true);
          }}
        >
          <BackIcon className="stroke-gray-50 w-[35px] h-[35px]" />
        </button>
        {isPopupOpen && !pendingFormType && (
          <Popup
            title="작성취소"
            content={`경험 작성을 취소하시겠습니까?\n취소하시면 입력하신 내용은 저장되지 않습니다.`}
            confirmText="작성 취소"
            cancelText="계속 작성"
            onConfirm={() => router.push('/exp')}
            onCancel={() => {
              setIsPopupOpen(false);
            }}
          />
        )}
        <div className="text-gray-50 text-2xl font-medium">경험 입력</div>
      </div>

      <div className="w-[1025px] px-12">
        {/*경험탭*/}
        <div className="flex mb-[-14px]">
          {forms.map((_, index) => (
            <div
              key={index}
              className={`w-48 h-20 ${activeFormIndex === index ? 'bg-gray-700 border-primary-50 border-t-2' : 'bg-black border border-gray-700 text-gray-400'} rounded-tl-2xl rounded-tr-2xl `}
              onClick={() => setActiveFormIndex(index)}
            >
              {forms.length > 1 && (
                <CloseIcon
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    handleRemoveExperienceTab(index);
                  }}
                  className="mx-41 my-2.5 w-4 h-4"
                />
              )}
              <div
                className={`flex h-full justify-center text-lg ${
                  forms.length > 1 ? 'mt-[-10px]' : 'mt-[22px]'
                }`}
                onDoubleClick={e => {
                  e.stopPropagation();
                  handleDoubleClickTab(index);
                }}
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    className="w-[100px] h-[30px] bg-[#5B5B5B] px-2 py-1"
                    value={editingValue}
                    autoFocus
                    onChange={e => setEditingValue(e.target.value)}
                    onBlur={() => handleSaveTabName(index)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSaveTabName(index);
                      }
                    }}
                  />
                ) : (
                  forms[index].tabName || `경험 ${index + 1}`
                )}
              </div>
            </div>
          ))}
          {/*경험 항목*/}
          <div
            className="w-48 h-20 'bg-black border border-gray-700 rounded-tl-2xl rounded-tr-2xl"
            onClick={() => handleAddExperienceTab(form.experienceType)}
          >
            <PlusGrayIcon className="flex mx-19.5 my-4.5 w-[27px] h-[27px] cursor-pointer" />
          </div>
        </div>
        {/*회색 배경*/}
        <div className="pt-[14px] z-0 relative bg-gray-700 rounded-2xl px-12">
          {/*작성양식 탭*/}

          <div className="pb-[60px]">
            {form.experienceType !== 'PRIZE' &&
              form.experienceType !== 'CERTIFICATES' && (
                <>
                  <div className="flex items-center justify-between w-full pt-7.5 pb-6.5">
                    <div className="text-gray-50 text-xl font-medium ml-[1%]">
                      작성 양식
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <HelpIcon className="stroke-gray-300 w-[24px] h-[24px]" />
                      </button>
                      <span className="text-neutral-400 font-medium p-2">
                        양식 활용 가이드
                      </span>
                    </div>
                  </div>
                  <FormTab
                    onChange={handleTabChange}
                    selectedTab={
                      forms[activeFormIndex].selectedTab as 'star' | 'simple'
                    }
                  />
                  {isPopupOpen && pendingFormType && (
                    <Popup
                      title="양식 변경"
                      content={`${
                        pendingFormType === 'STAR_FORM'
                          ? 'STAR 양식'
                          : '간결 양식'
                      }으로 변경하시겠습니까?\n변경하시면 입력하신 내용은 저장되지 않습니다.`}
                      confirmText="양식 변경"
                      cancelText="계속 작성"
                      onConfirm={confirmTabChange}
                      onCancel={() => setIsPopupOpen(false)}
                    />
                  )}
                </>
              )}
            {isModalOpen && (
              <GuideModal
                title={
                  form.selectedTab === 'star'
                    ? 'STAR양식 작성 가이드'
                    : '간결 양식 작성 가이드'
                }
                type={tab}
                closeRequest={() => setIsModalOpen(false)}
              />
            )}
          </div>

          {/*제목부터 입력*/}
          {renderForm()}
        </div>

        {/*저장 버튼*/}
        <div className="flex justify-between pt-15 gap-2.5">
          <button
            type="submit"
            onClick={() => {
              setForms(prev => {
                const updated = [...prev];
                updated[activeFormIndex] = {
                  ...updated[activeFormIndex],
                  status: 'DRAFT',
                };
                return updated;
              });
            }}
            className="w-[502px] h-14 py-5 bg-gray-800 text-sm text-gray-300 font-semibold border border-gray-50-10 rounded-lg"
          >
            임시저장
          </button>
          <button
            type="submit"
            onClick={() => {
              setForms(prev => {
                const updated = [...prev];
                updated[activeFormIndex] = {
                  ...updated[activeFormIndex],
                  status: 'SAVE',
                };
                return updated;
              });
            }}
            className="w-[502px] h-14 py-5 bg-primary-50 text-sm text-gray-1000 font-semibold rounded-lg"
          >
            작성완료
          </button>
        </div>
      </div>
      <Footer />
    </form>
  );
}

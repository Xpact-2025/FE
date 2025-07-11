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
import { ExpFormType, ExpStatus, ExpType } from '@/types/exp';
import AwardForm from './AwardForm';
import StarForm from './StarForm';
import SimpleForm from './SimpleForm';
import PlusGrayIcon from '@/public/icons/PlusIcon_gray.svg';
import CloseIcon from '@/public/icons/Close_small.svg';
import ExpHeader from '../../exp/components/ExpDetailHeader';

interface ExpFormProps {
  data?: ExpPayload & { subExperiencesResponseDto: SubExperience[] };
  onSuccess?: () => void;
  onCancel?: () => void;
  isEditMode?: boolean;
}

const getInitialForm = (
  data?: ExpPayload & { subExperiencesResponseDto?: SubExperience[] }
) => {
  const sub = data?.subExperiencesResponseDto?.[0];

  return {
    subExperiences: data?.subExperiencesResponseDto || [],
    selectedTab:
      data?.experienceType === 'PRIZE' ||
      data?.experienceType === 'CERTIFICATES'
        ? undefined
        : sub?.formType === 'STAR_FORM'
          ? 'star'
          : sub?.formType === 'SIMPLE_FORM'
            ? 'simple'
            : 'star',
    formType:
      data?.experienceType === 'PRIZE' ||
      data?.experienceType === 'CERTIFICATES'
        ? undefined
        : sub?.formType || 'STAR_FORM',
    status: sub?.status,
    uploadType: sub?.uploadType || 'FILE',
    experienceType: data?.experienceType || ('' as ExpType),
    qualification: data?.qualification || '',
    publisher: data?.publisher || '',
    issueDate: data?.issueDate || '',
    simpleDescription: sub?.simpleDescription || '',
    title: data?.title || '',
    startDate: data?.startDate || data?.issueDate || '',
    endDate: data?.endDate || data?.issueDate || '',
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

export default function ExpForm({
  data,
  onSuccess,
  onCancel,
  isEditMode = false,
}: ExpFormProps) {
  const router = useRouter();
  const [forms, setForms] = useState(() => {
    if (data?.subExperiencesResponseDto?.length) {
      return data.subExperiencesResponseDto.map(sub => ({
        ...getInitialForm({ ...data, subExperiencesResponseDto: [sub] }),
        subId: sub.subExperienceId,
      }));
    }
    return [getInitialForm(data)];
  });
  const [activeFormIndex, setActiveFormIndex] = useState(0);
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
    if (forms.length >= 4) {
      alert('경험은 최대 4개까지 추가할 수 있습니다.');
      return;
    }

    const isAward =
      currentExperienceType === 'PRIZE' ||
      currentExperienceType === 'CERTIFICATES';

    const newForm = {
      ...getInitialForm(undefined),
      id: forms[0].id,
      formType: isAward ? undefined : ('STAR_FORM' as ExpFormType),
      selectedTab: isAward ? undefined : 'star',
      experienceType: currentExperienceType,
      qualification: forms[0].qualification, // 기존 데이터도 복사해줘야 함
      publisher: forms[0].publisher,
      issueDate: forms[0].issueDate,
      startDate: forms[0].startDate,
      endDate: forms[0].endDate,
      title: forms[0].title,
      subId: undefined, // 새로운 서브 경험이므로 subId는 없음
      tabName: '',
      subTitle: '',
      role: '',
      perform: '',
      situation: '',
      task: '',
      action: '',
      result: '',
      simpleDescription: '',
      keywords: [],
      // files: [], // 필요 시 추가
    };

    setForms(prev => {
      const updatedForms = [...prev, newForm];
      setActiveFormIndex(updatedForms.length - 1);
      return updatedForms;
    });
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

  const isFormChanged = () => {
    const keysToCompare = [
      'qualification',
      'publisher',
      'issueDate',
      'simpleDescription',
      'title',
      'subTitle',
      'startDate',
      'endDate',
      'role',
      'perform',
      'situation',
      'task',
      'action',
      'result',
      //'files',
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
          ...getInitialForm({
            ...forms[activeFormIndex],
            subExperiencesResponseDto: [],
          }),
          formType: pendingFormType,
          selectedTab: pendingFormType === 'STAR_FORM' ? 'star' : 'simple',
          experienceType: forms[activeFormIndex].experienceType,
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
      console.log('변경된 폼:', updated[activeFormIndex]);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allSavedForms = forms.map(f => ({
      ...f,
      status: 'SAVE' as ExpStatus,
    }));

    setForms(allSavedForms);

    const payload: ExpPayload = {
      ...form,
      title: form.title,
      issueDate: form.issueDate
        ? new Date(form.issueDate).toISOString()
        : undefined,
      startDate: form.startDate
        ? new Date(form.startDate).toISOString()
        : undefined,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
      subExperiences: allSavedForms.map(f => ({
        status: f.status ?? 'SAVE',
        formType: f.formType ?? 'STAR_FORM',
        uploadType: f.uploadType ?? 'FILE',
        tabName: f.tabName ?? '',
        subTitle: f.subTitle ?? '',
        situation: f.situation ?? '',
        task: f.task ?? '',
        action: f.action ?? '',
        result: f.result ?? '',
        role: f.role ?? '',
        perform: f.perform ?? '',
        simpleDescription: f.simpleDescription ?? '',
        files: f.files ?? [],
        keywords: f.keywords ?? [],
        subExperienceId: f.subId,
      })),
    };

    const { httpStatus, message } = form.id
      ? await editExp(form.id, payload)
      : await saveExp(payload);

    if (httpStatus === 200) {
      alert('성공적으로 저장되었습니다!');
      console.log('보내는 payload:', payload);

      if (form.id) {
        // 수정일 때
        onSuccess?.(); // 상세페이지 내에서 갱신 처리
      } else {
        // 생성일 때
        router.push('/exp'); // 목록으로 이동
      }
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
    <>
      <form onSubmit={handleSubmit} className="p-20">
        {!isEditMode && (
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
        )}

        <div className="w-[1025px] px-12">
          {isEditMode && (
            <ExpHeader
              experienceType={form.experienceType}
              title={form.title}
              qualification={form.qualification}
              publisher={form.publisher}
              issueDate={form.issueDate}
              startDate={form.startDate}
              endDate={form.endDate}
              isEditing={true}
              onChange={{
                title: val => handleChange('title', val),
                qualification: val => handleChange('qualification', val),
                publisher: val => handleChange('publisher', val),
                issueDate: val => handleChange('issueDate', val),
                startDate: val => handleChange('startDate', val),
                endDate: val => handleChange('endDate', val),
              }}
            />
          )}
          {/*경험탭*/}
          <div className="flex mb-[-14px]">
            {forms.map((_, index) => (
              <div
                key={index}
                className={`relative flex items-center justify-center w-48 h-20 ${activeFormIndex === index ? 'bg-gray-700 border-primary-50 border-t-2' : 'bg-black border border-gray-700 text-gray-400'} rounded-tl-2xl rounded-tr-2xl `}
                onClick={() => setActiveFormIndex(index)}
              >
                {forms.length > 1 && (
                  <CloseIcon
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleRemoveExperienceTab(index);
                    }}
                    className="absolute top-2 right-3 w-4 h-4 cursor-pointer"
                  />
                )}
                <input
                  type="text"
                  className="w-[100px] h-[30px] bg-[#5B5B5B] px-2 py-1 text-center rounded text-lg"
                  value={forms[index].tabName ?? ''}
                  placeholder={`경험 ${index + 1}`}
                  onChange={e => {
                    const newTabName = e.target.value;
                    setForms(prev => {
                      const updated = [...prev];
                      updated[index] = {
                        ...updated[index],
                        tabName: newTabName,
                      };
                      return updated;
                    });
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            ))}

            {/*경험 항목*/}
            {forms.length < 4 && (
              <div
                className="w-48 h-20 'bg-black border border-gray-700 rounded-tl-2xl rounded-tr-2xl"
                onClick={() => handleAddExperienceTab(form.experienceType)}
              >
                <PlusGrayIcon className="flex mx-19.5 my-4.5 w-[27px] h-[27px] cursor-pointer" />
              </div>
            )}
          </div>
          {/*회색 배경*/}
          <div className="pt-[14px] z-0 relative bg-gray-700 rounded-2xl px-12">
            {/* 작성양식 탭 */}
            <div className="pb-[60px]">
              {form.experienceType !== 'PRIZE' &&
                form.experienceType !== 'CERTIFICATES' &&
                (!isEditMode || forms[activeFormIndex].subId === undefined) && (
                  <>
                    <div className="flex items-center justify-between w-full pt-7.5 pb-6.5">
                      <div className="text-gray-50 text-xl font-medium ml-[1%]">
                        작성 양식
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onMouseEnter={() => setIsModalOpen(true)}
                        >
                          <HelpIcon className="stroke-gray-300 w-[24px] h-[24px] cursor-pointer" />
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

              {/* 가이드 모달도 동일한 조건으로 보이도록 */}
              {isEditMode &&
                isModalOpen &&
                forms[activeFormIndex].subId === undefined && (
                  <GuideModal
                    title={
                      form.selectedTab === 'star'
                        ? 'STAR 양식 작성 가이드'
                        : '간결 양식 작성 가이드'
                    }
                    type={(form.selectedTab ?? 'star') as 'star' | 'simple'}
                    closeRequest={() => setIsModalOpen(false)}
                  />
                )}
            </div>

            {/*제목부터 입력*/}
            {renderForm()}
          </div>

          {/*저장 버튼*/}
          {!isEditMode && (
            <>
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
            </>
          )}

          {isEditMode && (
            <div className="flex justify-between pt-15 gap-2.5">
              <button
                type="button"
                onClick={onCancel}
                className="w-[502px] h-14 py-5 bg-gray-800 text-sm text-gray-300 font-semibold border border-gray-50-10 rounded-lg"
              >
                취소
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
                저장
              </button>
            </div>
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}

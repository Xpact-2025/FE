'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import CloseIcon from '@/public/icons/Close.svg';
import RadioFillIcon from '@/public/icons/Radio_Fill.svg';
import RadioNotFillIcon from '@/public/icons/Radio_NOT_Fill.svg';
import PlusIcon from '@/public/icons/PlusIcon.svg';
import { UploadType } from '@/types/exp';
import { MinusIcon } from 'lucide-react';
import Image from 'next/image';
import { saveFile } from '@/apis/exp';

interface UploadItem {
  id: number;
  uploadType: UploadType;
  file: { name: string; url: string } | null;
  link: string;
  newLink: string;
}

interface FileInputProps {
  onFileChange: (files: string[]) => void;
  //onLinkChange: (links: string[]) => void;
  initialFiles?: string[];
}

export default function FileInput({
  onFileChange,
  initialFiles = [],
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<UploadItem[]>([]);

  useEffect(() => {
    // 초기 파일이 있을 경우 설정
    if (items.length === 0) {
      if (initialFiles.length > 0) {
        const initialItems = initialFiles.map(fileUrl => ({
          id: Date.now() + Math.random(),
          uploadType: 'FILE' as UploadType,
          file: {
            name: extractFileName(fileUrl), // 파일명 추출 함수 필요
            url: fileUrl,
          },
          link: '',
          newLink: '',
        }));
        setItems(initialItems);
      } else {
        setItems([
          {
            id: Date.now(),
            uploadType: 'FILE',
            file: null,
            link: '',
            newLink: '',
          },
        ]);
      }
    }
  }, [initialFiles, items.length]);

  const extractFileName = (url: string) => {
    try {
      return decodeURIComponent(url.split('/').pop() || '파일명 없음');
    } catch {
      return '파일명 없음';
    }
  };

  const extractFilesAndLinks = (items: UploadItem[]) => {
    const files = items
      .filter(item => item.uploadType === 'FILE' && item.file)
      .map(item => item.file!.url);

    const links = items
      .filter(item => item.uploadType === 'LINK' && item.link)
      .map(item => item.link);

    return [...files, ...links];
  };

  const handleUploadTypeChange = (id: number, type: UploadType) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, uploadType: type, file: null, link: '', newLink: '' }
          : item
      )
    );
  };

  const uploadPresignedUrl = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('PDF 파일만 업로드할 수 있습니다.');
      return null;
    }
    const response = await saveFile(file.name);
    const { preSignedUrl, fileUrl } = response.data;

    await fetch(preSignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    return {
      name: file.name,
      url: fileUrl,
    };
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>, id: number) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      const pdfFile = droppedFiles.find(
        file => file.type === 'application/pdf'
      );

      if (!pdfFile) {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
      }

      try {
        const fileData = await uploadPresignedUrl(pdfFile);
        if (!fileData) return;

        const nextItems = items.map(item =>
          item.id === id ? { ...item, file: fileData } : item
        );

        setItems(nextItems);
        onFileChange(extractFilesAndLinks(nextItems));
      } catch {
        alert('파일 업로드에 실패했습니다.');
      }
    },
    [items, onFileChange]
  );

  const handleAddFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileData = await uploadPresignedUrl(file);
      if (!fileData) return;

      const nextItems = items.map(item =>
        item.id === id ? { ...item, file: fileData } : item
      );

      setItems(nextItems);
      onFileChange(extractFilesAndLinks(nextItems));
    } catch {
      alert('파일 업로드에 실패했습니다.');
    }
  };

  const handleRemoveFile = (id: number) => {
    const nextItems = items.map(item =>
      item.id === id ? { ...item, file: null } : item
    );

    setItems(nextItems);
    onFileChange(extractFilesAndLinks(nextItems));
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const value = e.target.value;
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, newLink: value } : item
      )
    );
  };

  const handleAddLink = (id: number, newLink: string) => {
    const nextItems = items.map(item =>
      item.id === id ? { ...item, link: newLink } : item
    );

    setItems(nextItems);
    onFileChange(extractFilesAndLinks(nextItems));
  };

  const handleRemoveLink = (id: number) => {
    const nextItems = items.map(item =>
      item.id === id ? { ...item, link: '', newLink: '' } : item
    );

    setItems(nextItems);
    onFileChange(extractFilesAndLinks(nextItems));
  };

  const removeItem = (id: number) => {
    const nextItems = items.filter(item => item.id !== id);

    setItems(nextItems);
    onFileChange(extractFilesAndLinks(nextItems));
  };

  const addNewItem = () => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: Date.now(),
        uploadType: 'FILE',
        file: null,
        link: '',
        newLink: '',
      },
    ]);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} className="whitespace-nowrap">
          {items.length > 1 && index > 0 && (
            <div className="w-[100%] h-0 border border-gray-600 mb-6.5"></div>
          )}
          <div className="flex mb-4">
            {/*라디오 버튼*/}
            <div className="flex gap-9 text-gray-200">
              <div className="flex gap-3">
                <div
                  onClick={() => handleUploadTypeChange(item.id, 'FILE')}
                  className="cursor-pointer"
                >
                  {item.uploadType === 'FILE' ? (
                    <RadioFillIcon className="w-[24px] h-[24px]" />
                  ) : (
                    <RadioNotFillIcon className="w-[24px] h-[24px]" />
                  )}
                </div>
                파일
              </div>
              <div className="flex gap-3">
                <div
                  onClick={() => handleUploadTypeChange(item.id, 'LINK')}
                  className="cursor-pointer"
                >
                  {item.uploadType === 'LINK' ? (
                    <RadioFillIcon className="w-[24px] h-[24px]" />
                  ) : (
                    <RadioNotFillIcon className="w-[24px] h-[24px]" />
                  )}
                </div>
                링크
              </div>
            </div>
            {items.length > 1 && index > 0 && (
              <div className="flex w-full justify-end">
                <MinusIcon
                  className="w-[44px] h-6 bg-gray-400 rounded-[4px]"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            )}
          </div>

          {item.uploadType === 'FILE' ? (
            <div>
              <div className="flex justify-between items-center gap-2.5">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  value={fileInputRef.current?.value || ''}
                  ref={fileInputRef}
                  onChange={e => handleAddFile(e, item.id)}
                />
                <button
                  type="button"
                  className="w-32 h-11 px-5 rounded bg-gray-600 text-gray-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  첨부파일 추가
                </button>
                <div
                  className="flex w-full h-11 rounded px-4 py-2.5 bg-gray-800
      border border-gray-700 text-gray-300 pb-5"
                  onDrop={e => handleDrop(e, item.id)}
                  onDragOver={e => e.preventDefault()}
                >
                  이곳에 파일을 올리거나 첨부 버튼을 이용해 주세요.
                </div>
              </div>
              <p className="text-gray-200 text-xs pt-4.5 mb-6.5">
                * 파일 첨부 시, PDF로 변환하여 업로드해주세요.
              </p>

              {item.file && (
                <ul className="pt-2">
                  <li
                    key={index}
                    className="w-fit flex justify-between gap-2 text-[15px] bg-gray-600 px-5 py-2.5 rounded mb-6.5"
                  >
                    <Image
                      src="/images/file.svg"
                      alt="file"
                      width={14}
                      height={18}
                    />
                    <a href={item.file.url}>{item.file.name}</a>
                    <button onClick={() => handleRemoveFile(item.id)}>
                      <CloseIcon />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div>
              <div className="flex gap-2 pb-5">
                <input
                  type="text"
                  value={item.newLink}
                  onChange={e => handleLinkChange(e, item.id)}
                  placeholder="이곳에 링크 주소를 입력하고 엔터를 눌러주세요."
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLink(item.id, item.newLink);
                    }
                  }}
                  className="w-full rounded h-11 px-4 py-5 bg-gray-800
      border border-gray-700 pb-5 placeholder-gray-300"
                />
              </div>
              <p className="text-gray-200 text-xs pt-2 mb-6.5">
                * 링크 첨부 시, 열람 가능한 주소를 입력해주세요. (예: 구글
                드라이브, 노션 등)
              </p>

              {item.link && (
                <ul className="pt-2 space-y-2">
                  <li
                    key={item.id}
                    className="w-fit flex justify-between gap-2 text-[15px] bg-gray-600 px-5 py-2.5 rounded mb-6.5"
                  >
                    <Image
                      src="/images/link.svg"
                      alt="link"
                      width={24}
                      height={24}
                    />
                    <a href={item.link}>{item.link}</a>
                    <button onClick={() => handleRemoveLink(item.id)}>
                      <CloseIcon />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addNewItem}
        className="flex gap-2.5 w-full h-14 items-center justify-center bg-gray-700 mt-7 p-2 text-gray-50 text-xl hover:bg-gray-600 rounded-full transition"
      >
        <PlusIcon className="w-[25px] h-[25px]" /> 항목 추가
      </button>
    </div>
  );
}

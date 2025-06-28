'use client';

import { useState, useCallback } from 'react';
import CloseIcon from '@/public/icons/Close.svg';
import RadioFillIcon from '@/public/icons/Radio_Fill.svg';
import RadioNotFillIcon from '@/public/icons/Radio_NOT_Fill.svg';
import PlusIcon from '@/public/icons/PlusIcon.svg';
import { UploadType } from '@/types/exp';
import { MinusIcon } from 'lucide-react';
import Image from 'next/image';

interface UploadItem {
  id: number;
  uploadType: UploadType;
  files: { name: string; url: string }[];
  links: string[];
  newLink: string;
}

export default function FileInput() {
  const [items, setItems] = useState<UploadItem[]>([
    { id: Date.now(), uploadType: 'FILE', files: [], links: [], newLink: '' },
  ]);

  const handleUploadTypeChange = (id: number, type: UploadType) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, uploadType: type, files: [], links: [], newLink: '' }
          : item
      )
    );
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: number) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      const pdfFile = droppedFiles.find(
        file => file.type === 'application/pdf'
      );

      if (!pdfFile) {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
      }

      const fileData = {
        name: pdfFile.name,
        url: URL.createObjectURL(pdfFile),
      };

      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id
            ? { ...item, files: [fileData], newLink: item.newLink || '' }
            : item
        )
      );
    },
    []
  );
  const handleRemoveFile = (id: number, index: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, files: item.files.filter((_, i) => i !== index) }
          : item
      )
    );
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

  const handleAddLink = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.newLink && item.links.length === 0
          ? { ...item, links: [item.newLink], newLink: '' }
          : item
      )
    );
  };

  const handleRemoveLink = (id: number, index: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, links: item.links.filter((_, i) => i !== index) }
          : item
      )
    );
  };

  const addNewItem = () => {
    setItems(prevItems => [
      ...prevItems,
      { id: Date.now(), uploadType: 'FILE', files: [], links: [], newLink: '' },
    ]);
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
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
                    <RadioFillIcon />
                  ) : (
                    <RadioNotFillIcon />
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
                    <RadioFillIcon />
                  ) : (
                    <RadioNotFillIcon />
                  )}
                </div>
                링크
              </div>
            </div>
            {items.length > 1 && index > 0 && (
              <button
                onClick={() => removeItem(item.id)}
                className="flex w-full justify-end"
              >
                <MinusIcon className="w-[44px] h-6 bg-gray-400 rounded-[4px]" />
              </button>
            )}
          </div>

          {item.uploadType === 'FILE' ? (
            <div className="">
              <div
                className="w-full px-4 py-3 bg-gray-800
      border border-gray-700 text-gray-300 pb-5"
                onDrop={e => handleDrop(e, item.id)}
                onDragOver={e => e.preventDefault()}
              >
                이곳에 파일을 올려주세요
              </div>
              <p className="text-gray-200 text-xs pt-4.5 mb-6.5">
                * 파일 첨부 시, PDF로 변환하여 업로드해주세요.
              </p>

              {item.files.length > 0 && (
                <ul className="pt-2">
                  {item.files.map((file, index) => (
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
                      <a href={file.url}>{file.name}</a>
                      <button onClick={() => handleRemoveFile(item.id, index)}>
                        <CloseIcon />
                      </button>
                    </li>
                  ))}
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
                      if (item.links.length < 1) {
                        handleAddLink(item.id);
                      }
                    }
                  }}
                  className="w-full px-4 py-3 bg-gray-800
      border border-gray-700 pb-5 placeholder-gray-300"
                />
              </div>
              <p className="text-gray-200 text-xs pt-2 mb-6.5">
                * 링크 첨부 시, 열람 가능한 주소를 입력해주세요. (예: 구글
                드라이브, 노션 등)
              </p>

              {item.links.length > 0 && (
                <ul className="pt-2 space-y-2">
                  {item.links.map((link, index) => (
                    <li
                      key={index}
                      className="w-fit flex justify-between gap-2 text-[15px] bg-gray-600 px-5 py-2.5 rounded mb-6.5"
                    >
                      <Image
                        src="/images/link.svg"
                        alt="link"
                        width={24}
                        height={24}
                      />
                      <a href={link}>{link}</a>
                      <button onClick={() => handleRemoveLink(item.id, index)}>
                        <CloseIcon />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addNewItem}
        className="flex gap-2.5 w-full h-14 items-center justify-center bg-gray-700 rounded mt-7 p-2 text-gray-50 text-xl"
      >
        <PlusIcon className="w-[25px] h-[25px]" /> 항목 추가
      </button>
    </div>
  );
}

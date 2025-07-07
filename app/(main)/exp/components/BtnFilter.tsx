'use client';

import { useState } from 'react';
import ArrowDownIcon from '@/public/icons/Arrow_Down.svg';
import CloseIcon from '@/public/icons/Close.svg';
import { EXP_OPTIONS } from '@/constants/expOptions';
import BtnExpType from '../../../components/BtnExpType';
import { ExpType } from '@/types/exp';

interface BtnFilterProps {
  onSelectType: (type: ExpType | null) => void;
  onSelectOrder: (order: 'latest' | 'oldest') => void;
}

export default function BtnFilter({
  onSelectType,
  onSelectOrder,
}: BtnFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ExpType | null>(null);
  const options = Object.values(EXP_OPTIONS);
  const selectedOption = options.find(o => o.value === selectedType);
  const [order, setOrder] = useState<'latest' | 'oldest'>('latest');

  const handleSelectType = (type: ExpType) => {
    if (type === null) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
    onSelectType(type);
  };

  const handleSelectOrder = (order: 'latest' | 'oldest') => {
    setOrder(order);
    onSelectOrder(order);
  };

  return (
    <div className="flex justify-end relative">
      <div
        className="flex items-center justify-center px-4 h-[40px] bg-gray-1000 border border-gray-50-20 rounded-lg text-gray-300 text-sm"
        onClick={() => setIsOpen(true)}
      >
        {selectedOption?.label || '전체'}•
        {order === 'latest' ? '최신순' : '과거순'}
        <ArrowDownIcon className="w-[24px] h-[24px]" />
      </div>
      {isOpen && (
        <div className="flex flex-col absolute justify-center w-[597px] h-[457px] top-[60px] bg-gray-1000 rounded-lg border border-gray-50-20 z-50 p-4">
          <div className="flex justify-end px-7">
            <CloseIcon onClick={() => setIsOpen(false)} />
          </div>
          <div className="flex flex-col justify-center px-16 gap-y-5">
            <div className="text-gray-50 text-xl">경험 유형</div>
            <div className="grid grid-cols-3 gap-2">
              <BtnExpType
                label="전체"
                selected={selectedType === null}
                onClick={() => {
                  setSelectedType(null);
                  onSelectType(null);
                }}
              ></BtnExpType>
              {options.map((option, index) => (
                <BtnExpType
                  key={index}
                  label={option.label}
                  selected={selectedType === option.value}
                  onClick={() => handleSelectType(option.value as ExpType)}
                />
              ))}
            </div>
            <div className="text-gray-50 text-xl">정렬 방식</div>
            <div className="flex gap-4">
              <BtnExpType
                label="최신순"
                selected={order === 'latest'}
                onClick={() => handleSelectOrder('latest')}
              />
              <BtnExpType
                label="과거순"
                selected={order === 'oldest'}
                onClick={() => handleSelectOrder('oldest')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

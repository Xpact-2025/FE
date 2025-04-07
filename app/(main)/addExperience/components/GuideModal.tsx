import React, { ReactNode } from 'react';

interface GuideModalProps {
  title: string;
  content: ReactNode;
  closeRequest: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({
  title,
  content,
  closeRequest,
}) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-end pr-[78px]"
      onClick={closeRequest}
    >
      <div
        className="bg-[#2D2D2D] p-6 rounded-2xl w-[758px]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <div className="text-stone-300 font-medium">{content}</div>
      </div>
    </div>
  );
};

export default GuideModal;

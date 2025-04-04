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
      className="absolute inset-0 flex items-center justify-center"
      onClick={closeRequest}
    >
      <div
        className="bg-[#2D2D2D] p-6 rounded-lg w-[700px]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-[32px] font-semibold mb-4">{title}</h2>
        <p className="text-[#CDCDCD]">{content}</p>
      </div>
    </div>
  );
};

export default GuideModal;

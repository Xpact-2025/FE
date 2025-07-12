'use client';

interface SkillMapReportProps {
  feedbackType: string;
  feedbackDescription: string;
  feedbackName: string;
  feedbackReason: string;
  suggestion: string;
  onClose: () => void;
}

export default function SkillMapReport({
  feedbackType,
  feedbackDescription,
  feedbackName,
  feedbackReason,
  suggestion,
  onClose,
}: SkillMapReportProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full py-8 px-10 rounded-[23px] bg-gray-800 flex flex-col z-10">
      <div className="flex justify-between items-center">
        <div className="body-16-sb">
          <span className="text-gray-50">{feedbackType}: </span>
          <span className="text-primary">{feedbackName}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 cursor-pointer"
        >
          ✕
        </button>
      </div>
      <div className="text-gray-400 body-11-m">{feedbackDescription}</div>
      <div className="mt-5">
        <div className="text-primary mb-2 text-[13px]">{feedbackName}</div>
        <p className="text-gray-200 text-[12px] whitespace-pre-wrap mb-4">
          {feedbackReason}
        </p>
        <div className="text-primary text-[13px] mb-2">커리어 연결</div>
        <p className="text-gray-200 text-[12px] whitespace-pre-wrap">
          {suggestion}
        </p>
      </div>
    </div>
  );
}

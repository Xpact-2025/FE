'use client';

interface SkillMapReportProps {
  feedbackType: string;
  feedbackDescription: string;
  feedbackName: string;
  suggestion: string;
  onClose: () => void;
}

export default function SkillMapReport({
  feedbackType,
  feedbackDescription,
  feedbackName,
  suggestion,
  onClose,
}: SkillMapReportProps) {
  return (
    <div className="relative py-8 px-10">
      <div className="absolute top-0 left-0 w-full h-[214px] py-8 px-10 rounded-[23px] bg-gray-800 flex flex-col z-10">
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
        <div className="text-gray-400 body-11-m mt-2">
          {feedbackDescription}
        </div>
        <div className="mt-10">
          <div className="text-primary body-9-r mb-2">{feedbackName}</div>
          <p className="text-gray-200 body-11-m whitespace-pre-wrap">
            {suggestion}
          </p>
        </div>
      </div>
    </div>
  );
}

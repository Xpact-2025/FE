import WarningIcon from '@/public/icons/Triangle_Warning.svg';

interface PopupProps {
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Popup({
  title,
  content,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: PopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[464px] h-[294px] bg-gray-700 rounded-[19.5px] outline outline-gray-600">
        <div className="flex flex-col items-center justify-center p-6">
          <WarningIcon />
          <div className="text-gray-50 body-26-sb py-6">{title}</div>
          <div className="text-gray-300 body-18-r text-center whitespace-pre-line">
            {content}
          </div>
        </div>
        <div className="flex justify-center gap-2.5 text-center text-gray-50 body-20-sb">
          <button
            type="button"
            onClick={onCancel}
            className="w-40 h-14 bg-gray-600 rounded-[130px]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-40 h-14 bg-primary-50 rounded-[130px]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

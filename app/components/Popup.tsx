import Image from 'next/image';

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
      <div className="w-[464px] h-72 bg-gray-700 rounded-lg outline outline-gray-500-20">
        <div className="flex flex-col items-center justify-center p-6">
          <Image
            src="/Triangle_Warning.png"
            alt="warning"
            width={40}
            height={40}
          />
          <div className="text-gray-50 text-2xl font-semibold pt-6">
            {title}
          </div>
          <div className="text-gray-200 text-lg text-center whitespace-pre-line pt-3">
            {content}
          </div>
        </div>
        <div className="flex justify-center gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="w-40 h-14 bg-gray-600 rounded-4xl text-center text-white text-xl font-semibold"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-40 h-14 bg-primary-50 rounded-4xl text-center text-white text-xl font-semibold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

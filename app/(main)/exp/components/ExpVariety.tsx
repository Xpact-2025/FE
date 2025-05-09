import { EXP_OPTIONS } from '@/constants/expOptions';
import { EXP_STYLES } from '@/constants/expStyles';
import { ExpType } from '@/types/exp';

export default function ExpVariety({ type }: { type: ExpType }) {
  const label = EXP_OPTIONS[type]?.label || type;
  const expTypeStyle = EXP_STYLES[type] || EXP_STYLES.ETC;

  return (
    <div
      className={`body-14-sb py-1 text-center font-semibold rounded-full ${expTypeStyle} w-[79px] h-[24px] flex items-center justify-center`}
    >
      {label}
    </div>
  );
}

import { EXP_OPTIONS } from '@/constants/expOptions';
import { EXP_STYLES } from '@/constants/expStyles';
import { ExpType } from '@/types/exp';

export default function ExpVariety({ type }: { type: ExpType }) {
  const label = EXP_OPTIONS[type]?.label || type;
  const expTypeStyle = EXP_STYLES[type] || EXP_STYLES.ETC;

  return (
    <div
      className={`body-12-r py-0.5 px-3 text-center rounded-full w-fit ${expTypeStyle} flex items-center justify-center`}
    >
      {label}
    </div>
  );
}

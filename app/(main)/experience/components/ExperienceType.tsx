import { EXPERIENCE_OPTIONS } from '@/constants/experienceOptions';
import { EXPERIENCE_STYLES } from '@/constants/experienceStyles';
import { ExperienceType } from '@/types/exp';

export default function ExpeienceCard({ type }: { type: ExperienceType }) {
  const label = EXPERIENCE_OPTIONS[type]?.label || type;
  const expTypeStyle = EXPERIENCE_STYLES[type] || EXPERIENCE_STYLES.ETC;

  return (
    <div
      className={`body-14-sb py-1 text-center font-semibold rounded-full ${expTypeStyle} w-[79px] h-[24px] flex items-center justify-center`}
    >
      {label}
    </div>
  );
}

import { EXPERIENCE_OPTIONS } from '@/constants/experienceOptions';
import { ExperienceType } from '@/types/exp';

export default function ExpType({ expType }: { expType: ExperienceType }) {
  const label = EXPERIENCE_OPTIONS[expType]?.label || expType;
  return (
    <div className="body-14-sb py-1 text-center font-semibold rounded-full text-pink-50 bg-pink-50-20 w-[79px] h-[24px] flex items-center justify-center">
      {label}
    </div>
  );
}

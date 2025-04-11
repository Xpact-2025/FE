import { ExperienceType } from '@/apis/exp';
import { EXPERIENCE_OPTIONS } from '@/constants/experienceOptions';

export default function ExpType({ expType }: { expType: ExperienceType }) {
  const label = EXPERIENCE_OPTIONS[expType]?.label || expType;
  return (
    <div className="body-12-r py-1 text-center font-semibold rounded-full text-pink-200 bg-pink-900 w-[79px]">
      {label}
    </div>
  );
}

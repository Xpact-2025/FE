interface ProfileItemProps {
  label: string;
  value: React.ReactNode;
}

export default function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <div className="flex w-full text-[15px]">
      <span className="text-[#808080] w-24">{label}</span>
      <div className="text-white">{value}</div>
    </div>
  );
}

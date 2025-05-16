export default function DateMark({ count }: { count: number }) {
  return (
    <span
      className={`block mx-auto mt-1 w-1.5 h-1.5 rounded-full ${
        count > 1 ? 'bg-primary' : 'bg-[#EAA26D]'
      }`}
    />
  );
}

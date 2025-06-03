export default function SkeletonBox({ title }: { title: string }) {
  return (
    <div className="flex-[38] bg-gray-800 rounded-[23px] py-8 px-10 h-[270px] flex flex-col">
      <div className="flex mb-3">
        <span className="body-16-sb mr-2">{title}</span>
      </div>
      <div className="flex flex-1 items-center justify-center text-gray-500">
        로딩 중...
      </div>
    </div>
  );
}

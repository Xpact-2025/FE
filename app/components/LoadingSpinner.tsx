export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div
        className="w-10 h-10 border-4 border-gray-200 border-b-primary rounded-full animate-spin"
        style={{ animationDuration: '2s' }}
      />
    </div>
  );
}

export default function Loading() {
  const skeletonIterations = 10;
  return (
    <div>
      <div className="flex justify-between align-middle mb-2">
        <h2 className="font-bold text-lg">Категории</h2>
        <div className="relative w-60 h-10 bg-gray-800 rounded-sm animate-pulse"></div>
      </div>
      <div>
        {Array.from({ length: skeletonIterations }).map((_, i) => (
          <div className="flex items-center justify-between mb-4" key={i}>
            <div className="relative w-full h-10 bg-gray-200 rounded-sm animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

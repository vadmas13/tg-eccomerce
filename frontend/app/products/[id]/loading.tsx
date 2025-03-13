export default function ProductCardLoading() {
  const skeletonIterations = 5;
  return (
    <div>
      <div className="flex justify-between align-middle mb-2">
        <h2 className="font-bold text-lg">Редактирование товара</h2>
        {/* <div className="relative w-60 h-10 bg-gray-200 rounded-sm animate-pulse"></div> */}
      </div>
      <div>
        {Array.from({ length: skeletonIterations }).map((_, i) => (
          <div
            className="flex items-start flex-col justify-between mb-4 gap-2"
            key={i}
          >
            <div className="relative w-40 h-5 bg-gray-200 rounded-sm animate-pulse"></div>
            <div className="relative w-full h-10 bg-gray-200 rounded-sm animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

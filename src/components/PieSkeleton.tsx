const PieSkeleton = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="mb-2">
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-300 rounded mt-2 animate-pulse"></div>
      </div>
      <div className="w-48 h-48 rounded-full overflow-hidden animate-pulse">
        <div className="bg-gray-300 h-full w-full"></div>
      </div>
    </div>
  );
};

export default PieSkeleton;

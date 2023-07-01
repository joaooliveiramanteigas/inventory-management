const LoadingSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 p-4">
        {/* Loading Card Skeletons */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex-shrink-0">
            <div className="max-w-md rounded overflow-hidden shadow-lg md:w-80 w-60">
              <div className="animate-pulse bg-gray-200 h-48 w-full"></div>
              <div className="px-6 py-4">
                <div className="animate-pulse bg-gray-200 h-6 w-3/4 mb-2"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-2/3"></div>
              </div>
              <div className="px-6 py-4">
                <div className="animate-pulse bg-gray-200 h-4 w-1/2"></div>
              </div>
              <div className="px-6 py-4">
                <div className="animate-pulse bg-gray-200 h-4 w-3/4"></div>
              </div>
              <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="animate-pulse bg-gray-200 h-6 w-1/3"></div>
                  </div>
                  <div className="animate-pulse bg-gray-200 h-6 w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;

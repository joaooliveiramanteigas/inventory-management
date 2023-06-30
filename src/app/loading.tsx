import { GiPopcorn } from "react-icons/gi";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-70">
      <div className="flex flex-wrap">
        <div className="w-12 h-16 m-1 animate-bounce">
          <GiPopcorn className="text-yellow-300 text-3xl" />
        </div>
        <div className="w-12 h-16 m-1 animate-bounce">
          <GiPopcorn className="text-yellow-300 text-3xl" />
        </div>
        <div className="w-12 h-16 m-1 animate-bounce">
          <GiPopcorn className="text-yellow-300 text-3xl" />
        </div>
      </div>
      <div className="absolute bottom-5 right-5 w-16 h-24 animate-pulse">
        <GiPopcorn className="text-pink-400 text-5xl" />
      </div>
    </div>
  );
}

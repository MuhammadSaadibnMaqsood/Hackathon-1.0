
const Loader = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-100">
      {/* Logo or main circle */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute w-full h-full border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-16 h-16 bg-zinc-100 rounded-full border-2 border-black"></div>
      </div>

      {/* Animated text */}
      <p className="mt-6 text-black font-semibold text-lg tracking-wide animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;

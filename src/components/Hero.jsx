import { useEffect, useRef } from "react";

const Hero = () => {
  const imgRef = useRef();
  const imgArr = [
    "/slider4.jpg",
    "/slide1.jpg",
    "/slider2.jpg",
    "/slider3.jpg",
  ];
  let i = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      imgRef.current.src = imgArr[i];
      i = (i + 1) % imgArr.length;
    }, 3000);

    imgRef.current.src = imgArr[0];

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-18 relative">
      <img
        ref={imgRef}
        src=""
        className="w-screen rounded-4xl p-6 h-[90vh] object-cover transition-all duration-500"
        alt="Slider"
      />

      <div className="absolute bottom-10 w-screen p-5  bg-white/80">
        <h1 className="bg-red-600 text-white TekturFont p-3 rounded-2xl text-3xl">
          Beacon of Hope and Healing
        </h1>
        <p className="p-3">
          NEXUS Hospital & Health Network stands as a beacon of hope and healing
          in Pakistan, providing accessible, high-quality healthcare to all,
          regardless of their ability to pay. Through innovative approaches and
          community engagement, IHHN strives to uphold its vision of a
          healthier, more equitable society for all.
        </p>
      </div>
    </div>
  );
};

export default Hero;

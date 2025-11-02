import React, { useEffect } from "react";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);
const TrustSection = () => {
  const TrustCardsRef = useRef(null);

  useEffect(() => {
    if (TrustCardsRef.current) {
      gsap.from(TrustCardsRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: TrustCardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  });
  return (
    <div className="py-16 md:py-24 px-4 ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12 md:mb-16">
          Building Trust Through Transparency
        </h1>

        <div
          ref={TrustCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          <TrustCard
            title="Our Beneficiaries, Our Heroes"
            imageUrl="https://indushospital.org.pk/wp-content/uploads/2025/03/Maham-Story-Thumbnail.jpg"
            description="Read the inspiring stories of our patients and the hope they represent."
          />

          <TrustCard
            title="Our Corporate Ambassadors"
            imageUrl="https://indushospital.org.pk/wp-content/uploads/2025/03/Ateeq-ur-Rehman-Thumbnail.jpg"
            description="Meet the leaders and partners championing our mission for free healthcare."
          />

          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center border-b pb-2 w-full">
              International Accreditations
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Our commitment to excellence is recognized globally by top health
              organizations.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4">
              <img
                src="https://indushospital.org.pk/wp-content/uploads/2023/12/AABB-1.jpg"
                alt="AABB Accreditation Logo"
                className="w-3/4 max-w-[150px] h-auto object-contain"
              />
              <img
                src="https://indushospital.org.pk/wp-content/uploads/2023/12/CAP-1-1.jpg"
                alt="CAP Accreditation Logo"
                className="w-3/4 max-w-[150px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrustCard = ({ title, imageUrl, description }) => (
  <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <div className="w-full h-56 overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>

    <div className="p-6 text-center">
      <h2 className="text-xl font-bold text-blue-700 mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <button className="mt-4 cursor-pointer text-sm font-semibold text-teal-600 hover:text-teal-700 border-b border-teal-600">
        Learn More &rarr;
      </button>
    </div>
  </div>
);

export default TrustSection;

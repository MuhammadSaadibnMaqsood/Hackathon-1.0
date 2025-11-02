import React from "react";
import TrustSection from "../components/TrustSection";
import Stats from "../components/Stats";

const imgArr = [
  "/slider4.jpg",
  "/slide1.jpg",
  "/slider2.jpg",
  "/slider3.jpg",
];

const About = () => {
  return (
    <section className="bg-zinc-100 pageTransition py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Logo and Text */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6">
            <img
              src="/Logo.png"
              alt="Hospital Logo"
              className="w-32 h-32 rounded-full object-contain"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-blue-800 mb-4">
            About Our Hospital
          </h1>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-blue-700">NEXUS Hospital</span>, 
            where compassion meets innovation. Our mission is to provide 
            high-quality healthcare services to every patient with dignity, care, and trust.
            We combine advanced medical technology with a dedicated team of doctors, 
            nurses, and staff to ensure the best treatment experience.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            From general check-ups to specialized surgeries, our facilities are designed 
            to meet the highest international healthcare standards. With a focus on 
            transparency, patient safety, and continuous improvement, we’re redefining 
            hospital care for the modern world.
          </p>

          <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition">
            Learn More
          </button>
        </div>

        {/* Right: Image Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {imgArr.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={src}
                alt={`About Image ${i + 1}`}
                className="object-cover w-full h-48 md:h-56 lg:h-64 hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <Stats/>

      <TrustSection/>
    </section>

  );
};

export default About;

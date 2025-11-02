import { useRef, useEffect } from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TrustSection from "../components/TrustSection";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    if (statsRef.current) {
      gsap.from(statsRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",

        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <div className="bg-zinc-100">
      <Hero />
      <div ref={statsRef}>
        <Stats />
      </div>

      <div>
        <div className=" w-screen p-5  bg-white/80">
          <h1 className="bg-red-600 text-white TekturFont p-3 rounded-2xl text-3xl">
            Strategic Direction
          </h1>
          <p className="p-3">
            To achieve our vision and mission, IHHN’s strategic direction
            continues to evolve, guided by eight core objectives. These
            objectives drive our commitment to accessible, high-quality
            healthcare, patient-centered services, community health, and
            innovation. Through a sustainable and forward-thinking approach, we
            aim to create lasting impact in healthcare delivery.
          </p>
        </div>
      </div>

      <TrustSection />
    </div>
  );
};

export default Home;

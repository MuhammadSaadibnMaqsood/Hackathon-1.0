import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Counter = ({ endValue }) => {
  const countRef = useRef(null);

  useEffect(() => {
    if (countRef.current) {
      gsap.fromTo(
        countRef.current,
        {
          innerText: 0,
        },
        {
          innerText: endValue,
          duration: 2.5,
          ease: "power1.out",

          snap: { innerText: 1 },

          scrollTrigger: {
            trigger: countRef.current,

            start: "top 80%",

            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      if (countRef.current && countRef.current._gsap) {
        gsap.killTweensOf(countRef.current);
        const st = ScrollTrigger.getById(countRef.current.id);
        if (st) st.kill();
      }
    };
  }, [endValue]);

  return (
    <span
      ref={countRef}
      id={`counter-${Math.random().toString(36).substr(2, 9)}`}
    ></span>
  );
};

export default Counter;

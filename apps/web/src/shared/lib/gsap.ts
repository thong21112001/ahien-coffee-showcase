import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Set default animation curve tailored to A Hiền Coffee's warm, calm pace
  gsap.defaults({
    ease: "power2.out",
    duration: 0.8,
  });

  // Limit lagSmoothing to maintain silky 60fps even under heavy load
  gsap.ticker.lagSmoothing(1000, 16);
}

export { gsap, ScrollTrigger };

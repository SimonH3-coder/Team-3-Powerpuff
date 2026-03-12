
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import videoBg from "../assets/video-bg.mp4";

export default function Hero() {
  const sectionRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      const progress = Math.min(scrolled / height, 1);
      setScale(1 + progress * 0.12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={videoBg} type="video/mp4" />
      </video>
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center px-8 lg:px-16 sm:gap-5">
        
        <div className="flex flex-col items-start md:w-1/2 order-2 md:order-1">
          <h1 className="hero-title text-white font-['Montserrat'] text-4xl md:text-[3.75rem] font-extrabold md:leading-18.75 tracking-[-0.09375rem]">
            See Your <br />Impact on{" "}
            <span className="text-[#4ade80]">Gran Canaria</span>
          </h1>

          <p className="hero-sub text-white/80 text-left mt-8 font-poppins text-sm">
            Join our community to share your thoughts, visualize the future, and take action for a greener Gran Canaria. 
          </p>

          <div className="hero-cta flex justify-start mt-8 gap-4">
            <Link to="/register" className="flex w-42.75 h-10 py-2 justify-center items-center bg-navy text-white rounded-[1.75rem] font-['Montserrat'] text-base font-semibold leading-6">
              Get Started
            </Link>
            <Link
              to="/forum"
              className="flex w-42.75 h-10 justify-center items-center border border-white text-white rounded-[1.75rem] font-['Montserrat'] text-[1rem] font-semibold hover:bg-white/10 transition-colors"
            >
              Explore the Forum
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
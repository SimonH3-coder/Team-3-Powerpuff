
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36 bg-gradient-blue">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between px-8 lg:px-16 sm:gap-5 md:gap-[17.81rem]">
        
        <div className="flex flex-col items-center md:items-start md:w-1/2 order-2 md:order-1">
          <h1 className="hidden md:block text-[#0A0A0A] font-['Montserrat'] text-[3.75rem] font-extrabold leading-[4.6875rem] tracking-[-0.09375rem]">
            See Your <br />Impact on{" "}
            <span className="text-dark-green">Gran Canaria</span>
          </h1>

          <p className="text-navy text-center md:text-left mt-8 font-poppins text-sm">
            Track your daily electricity consumption with our calculator, and protect the island's unique ecosystem. Join the movement for a sustainable future.
          </p>

          <div className="flex justify-center md:justify-start mt-8 gap-4">
            <Link to="#" className="flex w-[10.6875rem] h-10 py-2 justify-center items-center bg-navy text-white rounded-[1.75rem] font-['Montserrat'] text-base font-semibold leading-6">
              Get Started
            </Link>
            <Link
              to="#"
              className="flex w-[10.6875rem] h-10 justify-center items-center border border-navy rounded-[1.75rem] font-['Montserrat'] text-[1rem] font-semibold text-navy"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="relative w-fit mx-auto md:mx-0 mt-8 md:mt-0 md:w-1/2 flex justify-end">
          <img 
            src="/hero-image.png" 
            alt="Hero Image" 
            className="w-[25.125rem] h-[20.5625rem] block rounded-[1.75rem]" 
          />
          {/* Overlay with text - mobile only */}
          <div className="w-full absolute bottom-20 left-0 right-0 rounded-[1.75rem] backdrop-blur-xs bg-white/10 border border-white/30 shadow-xl px-4 py-6 md:hidden">
            <h1 className="text-white text-center font-['Montserrat'] text-[30px] font-normal">
              The only App that connect nature and people
            </h1>
          </div>
        </div>

      </div>
    </section>
  );
}
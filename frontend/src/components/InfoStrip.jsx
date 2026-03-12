import { Link } from "react-router-dom";
import peopleIcon from "../assets/people-icon1.png";
import eyeIcon from "../assets/eye-icon.png";
import forumIcon from "../assets/forum-icon.png";

export default function InfoStrip() {
  return (
    <section className="sm:py-2 mt-40 mb-30">
      <div className="text-center mb-14">
        <h1 className="text-center font-bold text-[3rem] leading-12 text-[#0A0A0A]">
          How it<span className="text-green-accent"> Works </span>
        </h1>
        <p className="mt-4 text-lg text-black  max-w-2xl mx-auto">
          Three simple steps to start making a difference for Gran Canaria's future.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-24">
        {/* Box 1 */}
        <Link to="#" className="h-full">
        <article className="h-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8">
           <div className="mb-4 flex justify-center">
          <img src={peopleIcon} alt="People icon" className="w-20 h-20" />
          </div>
          <h3 className="text-base font-semibold text-navy mb-1">Talk to others</h3>
          <p className="text-slate-500  text-[1rem]  leading-relaxed">Log in and talk in the forum with other people and discuss about your feelings about climate change.</p>
        </article>
        </Link>
        {/* Box 2 */}
        <Link to="#" className="h-full">
        <article className="h-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8">
          <div className="mb-4  flex justify-center">
            <img src={eyeIcon} alt="Eye icon" className="w-20 h-20 flex justify-center items-center" />
          </div>
          <h3 className="text-base font-semibold text-navy mb-1">Visualize the Future</h3>
          <p className="text-slate-500  text-[1rem]  leading-relaxed">Add pins to the maps to visualize potential changes in Gran Canaria's environment.</p>
        </article>
        </Link>
        {/* Box 3 */}
        <Link to="#" className="h-full">
        <article className="h-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8">
          <div className="mb-4  flex justify-center">
            <img src={forumIcon} alt="Forum icon" className="w-20 h-20 flex justify-center items-center" />
          </div>
          <h3 className="text-base font-semibold text-navy mb-1">Create an account</h3>
          <p className="text-slate-500  text-[1rem]  leading-relaxed">Join us by creating an account, press the log in button and start now!</p>
        </article>
        </Link>
      </div>
    </section>
  );
}
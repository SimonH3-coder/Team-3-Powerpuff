import PinImage from "../assets/pin-container.svg";
import wildlifeProtectionImage from "../assets/wildlife-protection.svg";
import electricityTrackerImage from "../assets/electricity-tracker.svg";
import islandStressLevelImage from "../assets/island-stress-level.svg";

export default function Features() {
  return (

    <section className="sm:py-2">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight">
          Powerful Features for
          <span className="text-green-accent"> Climate Action</span>
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          An application to track the electricity consumption and connect with like-minded people.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-24">
  {/* Box 1 */}
  <article className="h-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="mb-4">
      <img src={PinImage} alt="Climate Map icon" className="w-16 h-16" />
    </div>
    <h3 className="text-base font-semibold text-navy mb-1">Climate Map</h3>
    <p className="text-slate-500 text-sm leading-relaxed">See real-time stats on your personal climate footprint and progress.</p>
  </article>

  {/* Box 2 */}
  <article className="h-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="mb-4">
      <img src={electricityTrackerImage} alt="Electricity Tracker icon" className="w-16 h-16" />
    </div>
    <h3 className="text-base font-semibold text-navy mb-1">Forum</h3>
    <p className="text-slate-500 text-sm leading-relaxed">Join the conversation and share your thoughts on climate change and its impact on Gran Canaria.</p>
  </article>

  {/* Box 3 */}
  <article className="h-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="mb-4">
      <img src={islandStressLevelImage} alt="Island Stress Level icon" className="w-16 h-16" />
    </div>
    <h3 className="text-base font-semibold text-navy mb-1">Island Stress Level</h3>
    <p className="text-slate-500 text-sm leading-relaxed">Track environmental stress indicators with the map.</p>
  </article>

</div>
    </section>
  );
}
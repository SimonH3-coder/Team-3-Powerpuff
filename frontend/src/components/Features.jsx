import PinImage from "../assets/pin-container.png";
import wildlifeProtectionImage from "../assets/wildlife-protection.png";
import electricityTrackerImage from "../assets/electricity-tracker.png";
import islandStressLevelImage from "../assets/island-stress-level.png";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  {/* Box 1 */}
  <article className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="mb-4">
      <img src={PinImage} alt="Climate Map icon" className="w-16 h-16" />
    </div>
    <h3 className="text-base font-semibold text-navy mb-1">Climate Map</h3>
    <p className="text-slate-500 text-sm leading-relaxed">See real-time stats on your personal climate footprint and progress.</p>
  </article>

  {/* Box 2 */}
  <article className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="mb-4">
      <img src={wildlifeProtectionImage} alt="Wildlife Protection icon" className="w-16 h-16" />
    </div>
    <h3 className="text-base font-semibold text-navy mb-1">Wildlife Protection</h3>
    <p className="text-slate-500 text-sm leading-relaxed">Interactive maps showing biodiversity, green spaces, and air quality near you.</p>
  </article>

  {/* Box 3 */}
  <article className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="mb-4">
      <img src={electricityTrackerImage} alt="Electricity Tracker icon" className="w-16 h-16" />
    </div>
    <h3 className="text-base font-semibold text-navy mb-1">Electricity Tracker</h3>
    <p className="text-slate-500 text-sm leading-relaxed">Track your daily electricity consumption with our calculator, and protect the island's unique ecosystem.</p>
  </article>

  {/* Box 4 */}
  <article className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
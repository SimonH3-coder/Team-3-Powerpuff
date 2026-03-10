import Header from "../components/Header";
import Container from "../components/Container";
import profileImage from "../assets/profile-image.svg";

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-accent-green flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const LogOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-accent-green flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
    />
  </svg>
);

const SettingsRow = ({ label }) => (
  <div className="flex items-center justify-between py-4 px-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors last:border-b-0">
    <span className="text-white text-sm font-medium font-poppins">{label}</span>
    <ChevronRight />
  </div>
);

const SettingsTitle = ({ className = "" }) => (
  <h1 className={`text-3xl font-bold font-poppins ${className}`}>
    <span className="text-accent-green">Se</span>
    <span className="text-navy">tt</span>
    <span className="text-accent-green">ings</span>
  </h1>
);

const SettingsCard = () => (
  <div className="bg-navy rounded-2xl overflow-hidden w-full">
    {/* User info header */}
    <div className="px-6 py-4 text-center border-b border-white/10">
      <p className="text-white font-semibold text-sm font-poppins">Carlos Santana</p>
      <p className="text-white/70 text-xs font-poppins mt-0.5">CarlosSantana@gmail.com</p>
    </div>

    {/* Menu rows */}
    <SettingsRow label="Account Details" />
    <SettingsRow label="Saved Locations" />
    <SettingsRow label="Post in the Forum" />
    <SettingsRow label="Notifications" />

    {/* Log Out */}
    <div className="flex items-center justify-center gap-2 py-4 cursor-pointer hover:bg-white/5 transition-colors">
      <LogOutIcon />
      <span className="text-white text-sm font-poppins">Log Out</span>
    </div>
  </div>
);

export default function Settings() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <Container>

          {/* ── Mobile layout (below md) ── */}
          <div className="md:hidden flex flex-col items-center pt-10 pb-16 px-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-sky shadow-md">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-4 text-sm font-poppins text-gray-700">@carlossntos99</p>
            <p className="text-sm font-poppins text-center text-gray-600 mt-1">
              Nature lover,<br />web development student
            </p>

            <SettingsTitle className="mt-8" />

            <div className="mt-6 w-full">
              <SettingsCard />
            </div>
          </div>

          {/* ── Desktop layout (md and above) ── */}
          <div className="hidden md:grid md:grid-cols-[auto_1fr] gap-12 py-20 px-8 max-w-3xl mx-auto items-start">

            {/* Left column: avatar + info + title */}
            <div className="flex flex-col items-center w-52">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sky shadow-md">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-5 text-sm font-poppins text-gray-700">@carlossntos99</p>
              <p className="text-sm font-poppins text-center text-gray-600 mt-1">
                Nature lover,<br />web development student
              </p>

              <SettingsTitle className="mt-8 text-center" />
            </div>

            {/* Right column: settings card */}
            <SettingsCard />
          </div>

        </Container>
      </div>
    </>
  );
}

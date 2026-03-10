import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Container from "../components/Container";
import profileImage from "../assets/profile-image.svg";

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
  </svg>
);

function SettingsRow({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-4 px-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors"
    >
      <span className="text-white text-sm font-medium font-poppins">{label}</span>
      <ChevronRight />
    </div>
  );
}

function NotificationsPanel() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [forumReplies, setForumReplies] = useState(true);
  const [newPosts, setNewPosts] = useState(false);

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
        value ? "bg-accent-green" : "bg-white/30"
      }`}
    >
      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
        value ? "translate-x-5" : "translate-x-0"
      }`} />
    </button>
  );

  return (
    <div className="px-6 pb-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-sm font-poppins">Email notifications</span>
        <Toggle value={emailNotifs} onChange={setEmailNotifs} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-sm font-poppins">Forum replies</span>
        <Toggle value={forumReplies} onChange={setForumReplies} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-sm font-poppins">New posts nearby</span>
        <Toggle value={newPosts} onChange={setNewPosts} />
      </div>
    </div>
  );
}

function SettingsCard({ navigate, onLogout }) {
  const [notifsOpen, setNotifsOpen] = useState(false);

  return (
    <div className="bg-navy rounded-2xl overflow-hidden w-full">
      {/* User info header */}
      <div className="px-6 py-4 text-center border-b border-white/10">
        <p className="text-white font-semibold text-sm font-poppins">Carlos Santana</p>
        <p className="text-white/70 text-xs font-poppins mt-0.5">CarlosSantana@gmail.com</p>
      </div>

      <SettingsRow label="Account Details" onClick={() => navigate("/profile")} />
      <SettingsRow label="Saved Locations" onClick={() => navigate("/map")} />
      <SettingsRow label="Post in the Forum" onClick={() => navigate("/forum")} />

      {/* Notifications expandable */}
      <div
        onClick={() => setNotifsOpen(v => !v)}
        className="flex items-center justify-between py-4 px-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <span className="text-white text-sm font-medium font-poppins">Notifications</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 text-accent-green transition-transform duration-200 ${notifsOpen ? "rotate-90" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {notifsOpen && <NotificationsPanel />}

      {/* Log Out */}
      <div
        onClick={onLogout}
        className="flex items-center justify-center gap-2 py-4 cursor-pointer hover:bg-white/5 transition-colors"
      >
        <LogOutIcon />
        <span className="text-white text-sm font-poppins">Log Out</span>
      </div>
    </div>
  );
}

function AvatarWithHover({ size }) {
  const [hovered, setHovered] = useState(false);
  const sizeClass = size === "lg" ? "w-32 h-32" : "w-24 h-24";

  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden border-4 border-sky shadow-md relative cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
      {hovered && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-white text-[10px] font-poppins text-center leading-tight">Change<br />photo</span>
        </div>
      )}
    </div>
  );
}

const SettingsTitle = ({ className = "" }) => (
  <h1 className={`text-3xl font-bold font-poppins ${className}`}>
    <span className="text-accent-green">Se</span>
    <span className="text-navy">tt</span>
    <span className="text-accent-green">ings</span>
  </h1>
);

export default function Settings() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-white">
        <Container>

          {/* ── Mobile layout (below md) ── */}
          <div className="md:hidden flex flex-col items-center pt-10 pb-16 px-6">
            <AvatarWithHover size="sm" />

            <p className="mt-4 text-sm font-poppins text-gray-700">@carlossntos99</p>
            <p className="text-sm font-poppins text-center text-gray-600 mt-1">
              Nature lover,<br />web development student
            </p>

            <SettingsTitle className="mt-8" />

            <div className="mt-6 w-full">
              <SettingsCard navigate={navigate} onLogout={handleLogout} />
            </div>
          </div>

          {/* ── Desktop layout (md and above) ── */}
          <div className="hidden md:grid md:grid-cols-[auto_1fr] gap-12 py-20 px-8 max-w-3xl mx-auto items-start">

            {/* Left column: avatar + info + title */}
            <div className="flex flex-col items-center w-52">
              <AvatarWithHover size="lg" />

              <p className="mt-5 text-sm font-poppins text-gray-700">@carlossntos99</p>
              <p className="text-sm font-poppins text-center text-gray-600 mt-1">
                Nature lover,<br />web development student
              </p>

              <SettingsTitle className="mt-8 text-center" />
            </div>

            {/* Right column: settings card */}
            <SettingsCard navigate={navigate} onLogout={handleLogout} />
          </div>

        </Container>
      </div>
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Container from "../components/Container";
import profileImage from "../assets/profile-image.svg";

const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
const LogOutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent-green flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>;

function SettingsRow({ label, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center justify-between py-4 px-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
      <span className="text-white text-sm font-medium font-poppins">{label}</span>
      <ChevronRight />
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className={`w-10 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${value ? "bg-accent-green" : "bg-white/30"}`}>
      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function NotificationsPanel() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [forumReplies, setForumReplies] = useState(true);
  const [newPosts, setNewPosts] = useState(false);
  return (
    <div className="px-6 pb-4 flex flex-col gap-3">
      <div className="flex items-center justify-between"><span className="text-white/80 text-sm font-poppins">Email notifications</span><Toggle value={emailNotifs} onChange={setEmailNotifs} /></div>
      <div className="flex items-center justify-between"><span className="text-white/80 text-sm font-poppins">Forum replies</span><Toggle value={forumReplies} onChange={setForumReplies} /></div>
      <div className="flex items-center justify-between"><span className="text-white/80 text-sm font-poppins">New posts nearby</span><Toggle value={newPosts} onChange={setNewPosts} /></div>
    </div>
  );
}

function SettingsCard({ navigate, onLogout, username, email }) {
  const [notifsOpen, setNotifsOpen] = useState(false);
  return (
    <div className="bg-navy rounded-2xl overflow-hidden w-full">
      <div className="px-6 py-4 text-center border-b border-white/10">
        <p className="text-white font-semibold text-sm font-poppins">{username || "User"}</p>
        <p className="text-white/70 text-xs font-poppins mt-0.5">{email}</p>
      </div>
      <SettingsRow label="Account Details" onClick={() => navigate("/profile")} />
      <SettingsRow label="Saved Locations" onClick={() => navigate("/map")} />
      <SettingsRow label="Post in the Forum" onClick={() => navigate("/forum")} />
      <div onClick={() => setNotifsOpen(v => !v)} className="flex items-center justify-between py-4 px-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
        <span className="text-white text-sm font-medium font-poppins">Notifications</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 text-accent-green transition-transform duration-200 ${notifsOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </div>
      {notifsOpen && <NotificationsPanel />}
      <div onClick={onLogout} className="flex items-center justify-center gap-2 py-4 cursor-pointer hover:bg-white/5 transition-colors">
        <LogOutIcon />
        <span className="text-white text-sm font-poppins">Log Out</span>
      </div>
    </div>
  );
}

function AvatarWithHover({ size, avatarUrl, onUpload }) {
  const [hovered, setHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileRef = useRef(null);
  const sizeClass = size === "lg" ? "w-32 h-32" : "w-24 h-24";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    if (onUpload) onUpload(file).finally(() => URL.revokeObjectURL(localUrl));
  };

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden border-4 border-sky shadow-md relative cursor-pointer`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => fileRef.current?.click()}>
      <img src={previewUrl || avatarUrl} alt="Profile" className="w-full h-full object-cover" />
      {hovered && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="text-white text-[10px] font-poppins text-center leading-tight">Change<br />photo</span>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
}

const SettingsTitle = ({ className = "" }) => (
  <h1 className={`text-3xl font-bold font-poppins ${className}`}>
    <span className="text-accent-green">Se</span><span className="text-navy">tt</span><span className="text-accent-green">ings</span>
  </h1>
);

export default function Settings() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("/api/profiles", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data) setProfile(data); })
      .catch(() => {});
  }, []);

  async function handleAvatarUpload(file) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!token || !user?.id) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`/api/profiles/${user.id}/avatar`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        const updated = await res.json();
        const freshUrl = updated.avatar_url + '?t=' + Date.now();
        setProfile((prev) => ({ ...prev, avatar_url: freshUrl }));
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setUploading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const displayName = profile?.username ? `@${profile.username}` : "@username";
  const displayBio = profile?.bio || "Nature lover,\nweb development student";
  const displayEmail = profile?.email || "";
  const avatarUrl = profile?.avatar_url || null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <Container>
          <div className="md:hidden flex flex-col items-center pt-10 pb-16 px-6">
            <AvatarWithHover size="sm" avatarUrl={avatarUrl} onUpload={handleAvatarUpload} />
            {uploading && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
            <p className="mt-4 text-sm font-poppins text-gray-700">{displayName}</p>
            <p className="text-sm font-poppins text-center text-gray-600 mt-1 whitespace-pre-line">{displayBio}</p>
            <SettingsTitle className="mt-8" />
            <div className="mt-6 w-full"><SettingsCard navigate={navigate} onLogout={handleLogout} username={profile?.username} email={displayEmail} /></div>
          </div>
          <div className="hidden md:grid md:grid-cols-[auto_1fr] gap-12 py-20 px-8 max-w-3xl mx-auto items-start">
            <div className="flex flex-col items-center w-52">
              <AvatarWithHover size="lg" avatarUrl={avatarUrl} onUpload={handleAvatarUpload} />
              {uploading && <p className="text-xs text-gray-400 mt-1">Uploading…</p>}
              <p className="mt-5 text-sm font-poppins text-gray-700">{displayName}</p>
              <p className="text-sm font-poppins text-center text-gray-600 mt-1 whitespace-pre-line">{displayBio}</p>
              <SettingsTitle className="mt-8 text-center" />
            </div>
            <SettingsCard navigate={navigate} onLogout={handleLogout} username={profile?.username} email={displayEmail} />
          </div>
        </Container>
      </div>
    </>
  );
}


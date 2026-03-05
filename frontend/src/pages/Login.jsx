import { useState } from 'react';
import { Link } from 'react-router-dom';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="text-gray-400 flex-shrink-0">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="text-gray-400 flex-shrink-0">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="text-gray-400 flex-shrink-0">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <>
      {/* ── MOBILE LAYOUT (hidden on md and above) ── */}
      <div className="md:hidden min-h-screen bg-white flex flex-col font-sans">

        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-3">
          <button className="flex items-center justify-center w-10 h-10 text-gray-800" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-base font-bold select-none">🌿</span>
            <span className="font-bold text-gray-800 text-base tracking-wide">Raíces</span>
            <span className="text-lg">🍃</span>
          </Link>
          <div className="w-10" />
        </div>

        {/* Card */}
        <div className="flex-1 flex flex-col justify-center px-5 py-6">
          <div className="bg-[#122d47] rounded-2xl px-6 py-8 flex flex-col gap-5 border-2 border-dashed border-blue-300/40">

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl font-bold text-white leading-snug">
                Log in to NameWebsite
              </h1>
              <p className="text-white font-bold text-sm mt-1">Welcome back! Please enter your details</p>
            </div>

            {/* Inputs white card */}
            <div className="bg-white rounded-2xl px-5 py-4 flex flex-col gap-4">
              {/* Email field */}
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <MailIcon />
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full"
                />
              </div>

              {/* Password field */}
              <div className="flex items-center gap-3">
                <LockIcon />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="text-gray-400 flex-shrink-0"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-center -mt-2">
              <Link to="/forgot-password" className="text-sm text-gray-300 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Log in button */}
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-full py-3 text-sm transition-colors"
            >
              Log In
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-400 font-medium hover:underline">
                Sign up now
              </Link>
            </p>

            {/* Made with love */}
            <p className="text-center text-sm text-gray-300">
              Made with 💚 for the Canary Islands
            </p>

            {/* Footer inside card */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-200 transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-200 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (hidden on mobile, shown on md and above) ── */}
      <div className="hidden md:flex min-h-screen w-full font-sans">

        {/* Left — landscape photo */}
        <div
          className="md:w-3/5 bg-cover bg-center"
          style={{ backgroundImage: "url('PaisajeGranCanaria.jpg')" }}
        />

        {/* Right — form panel */}
        <div className="md:w-2/5 flex flex-col justify-between bg-white px-10 py-8 overflow-y-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 w-fit hover:opacity-80 transition-opacity">
            <span className="text-xl">🌍</span>
            <span className="font-semibold text-gray-800 text-base tracking-wide">Raíces</span>
            <span className="text-lg">🌿</span>
          </Link>

          {/* Form content */}
          <div className="flex flex-col gap-5 w-full max-w-xs mx-auto">
            <h1 className="text-2xl font-normal text-gray-800 leading-snug">
              Nice to see you <span className="font-bold">again</span>
            </h1>

            {/* Login */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Login</label>
              <input
                type="text"
                placeholder="Email or phone number"
                className="border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setRemember(v => !v)}
                className="flex items-center gap-2 group"
                aria-label="Toggle remember me"
              >
                <span className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 ${remember ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${remember ? 'translate-x-5' : 'translate-x-0'}`} />
                </span>
                <span className="text-sm text-gray-600">Remember me</span>
              </button>
              <a href="/forgot-password" className="text-sm text-green-600 hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {/* Sign in Button */}
            <button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg py-3 text-sm transition-colors"
            >
              Sign in
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-gray-400">
              Dont have an account?{' '}
              <Link to="/register" className="text-green-600 hover:underline font-medium">
                Sign up now
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400">© Raíces 2026</p>
        </div>
      </div>
    </>
  );
}

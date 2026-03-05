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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex h-screen w-full font-sans">

      {/* Left — landscape photo */}
      <div
        className="hidden md:block md:w-3/5 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('PaisajeGranCanaria.jpg')",
        }}
      />

      {/* Right — form panel */}
      <div className="w-full md:w-2/5 flex flex-col justify-between bg-white px-10 py-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 w-fit hover:opacity-80 transition-opacity">
          <span className="text-xl">🌍</span>
          <span className="font-semibold text-gray-800 text-base tracking-wide">Raíces</span>
          <span className="text-lg">🌿</span>
        </Link>

        {/* Form content */}
        <div className="flex flex-col gap-5 w-full max-w-xs mx-auto">
          <h1 className="text-2xl font-normal text-gray-800 leading-snug">
            Welcome to <span className="font-bold text-green-700">our</span> Page
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Email</label>
            <input
              type="email"
              placeholder="Email"
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="button"
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg py-3 text-sm transition-colors mt-1"
          >
            Create Account
          </button>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-400">
            have an account?{' '}
            <a href="#" className="text-green-600 hover:underline font-medium">
              Sign in now
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">© Raíces 2026</p>
      </div>
    </div>
  );
}

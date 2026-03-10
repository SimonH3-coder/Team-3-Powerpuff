import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="text-gray-400 flex-shrink-0">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }), 
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Could not connect to the server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden min-h-screen bg-white flex flex-col font-sans">

        <div className="relative">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="flex items-center justify-center w-10 h-10 text-gray-800"
              aria-label="Menu"
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
            <Link to="/" className="flex items-center gap-1.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-base font-bold select-none">🌿</span>
              <span className="font-bold text-gray-800 text-base tracking-wide">Raíces</span>
              <span className="text-lg">🍃</span>
            </Link>
            <div className="w-10" />
          </div>

          {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50">
              <nav className="flex flex-col px-4 py-2">
                <Link to="/" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-green-600 border-b border-gray-100 transition-colors">Home</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-green-600 border-b border-gray-100 transition-colors">Log in</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Sign up</Link>
              </nav>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center px-5 py-6">
          <div className="bg-[#122d47] rounded-2xl px-6 py-8 flex flex-col gap-5">

            <div className="text-center">
              <h1 className="text-xl font-bold text-white leading-snug">Create your Account</h1>
              <p className="text-green-400 text-sm mt-1">Join us for a better future</p>
            </div>

            <div className="bg-white rounded-2xl px-5 py-4 flex flex-col gap-4">
              {/* Username */}
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <UserIcon />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full"
                />
              </div>

              {/* Email */}
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <MailIcon />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full"
                />
              </div>

              {/* Password */}
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <LockIcon />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="text-gray-400 flex-shrink-0">
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="flex items-center gap-3">
                <LockIcon />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full"
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="text-gray-400 flex-shrink-0">
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button type="button" onClick={handleRegister} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full py-3 text-sm transition-colors disabled:opacity-60">
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>

            <p className="text-center text-xs text-gray-400">
              By signing up, you agree to our <span className="text-green-400">Terms</span> and <span className="text-green-400">Privacy Policy</span>
            </p>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-400 font-medium hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex min-h-screen w-full font-sans">

        <div className="md:w-3/5 bg-cover bg-center" style={{ backgroundImage: "url('PaisajeGranCanaria.jpg')" }} />

        <div className="md:w-2/5 flex flex-col justify-between bg-white px-10 py-8 overflow-y-auto">

          <Link to="/" className="flex items-center gap-1.5 w-fit hover:opacity-80 transition-opacity">
            <span className="text-xl">🌍</span>
            <span className="font-semibold text-gray-800 text-base tracking-wide">Raíces</span>
            <span className="text-lg">🌿</span>
          </Link>

          <div className="flex flex-col gap-5 w-full max-w-xs mx-auto">
            <h1 className="text-2xl font-normal text-gray-800 leading-snug">
              Welcome to <span className="font-bold text-green-700">our</span> Page
            </h1>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button type="button" onClick={handleRegister} disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 text-sm transition-colors disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-gray-400">
              Have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline font-medium">Sign in now</Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400">© Raíces 2026</p>
        </div>
      </div>
    </>
  );
}
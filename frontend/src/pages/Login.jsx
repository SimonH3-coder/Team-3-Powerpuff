import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '../components/Icons';

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/profile');
      }
    } catch (err) {
      setError('Could not connect to the server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="md:hidden min-h-screen bg-white flex flex-col font-sans">
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-3">
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
          <div className="bg-[#122d47] rounded-2xl px-6 py-8 flex flex-col gap-5 border-2 border-dashed border-blue-300/40">
            <div className="text-center">
              <h1 className="text-xl font-bold text-white leading-snug">Log in to NameWebsite</h1>
              <p className="text-white font-bold text-sm mt-1">Welcome back! Please enter your details</p>
            </div>
            <div className="bg-white rounded-2xl px-5 py-4 flex flex-col gap-4">
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <MailIcon />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full" />
              </div>
              <div className="flex items-center gap-3">
                <LockIcon />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full" />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="text-gray-400 shrink-0" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <div className="flex justify-center -mt-2">
              <Link to="/forgot-password" className="text-sm text-gray-300 hover:underline">Forgot password?</Link>
            </div>
            <button type="button" onClick={handleLogin} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-full py-3 text-sm transition-colors disabled:opacity-60">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            <p className="text-center text-sm text-gray-300">Don't have an account?{' '}<Link to="/register" className="text-green-400 font-medium hover:underline">Sign up now</Link></p>
            <p className="text-center text-sm text-gray-300">Made with 💚 for the Canary Islands</p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-200 transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-200 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex min-h-screen w-full font-sans">
        <div className="md:w-3/5 bg-cover bg-center" style={{ backgroundImage: "url('PaisajeGranCanaria.jpg')" }} />
        <div className="md:w-2/5 flex flex-col justify-between bg-white px-10 py-8 overflow-y-auto">
          <Link to="/" className="flex items-center gap-1.5 w-fit hover:opacity-80 transition-opacity">
            <span className="text-xl">🌍</span>
            <span className="font-semibold text-gray-800 text-base tracking-wide">Raíces</span>
            <span className="text-lg">🌿</span>
          </Link>
          <div className="flex flex-col gap-5 w-full max-w-xs mx-auto">
            <h1 className="text-2xl font-normal text-gray-800 leading-snug">Nice to see you <span className="font-bold">again</span></h1>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Email</label>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Toggle password visibility">
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setRemember(v => !v)} className="flex items-center gap-2 group" aria-label="Toggle remember me">
                <span className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 ${remember ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${remember ? 'translate-x-5' : 'translate-x-0'}`} />
                </span>
                <span className="text-sm text-gray-600">Remember me</span>
              </button>
              <a href="/forgot-password" className="text-sm text-green-600 hover:underline font-medium">Forgot password?</a>
            </div>
            <button type="button" onClick={handleLogin} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg py-3 text-sm transition-colors disabled:opacity-60">
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
            <p className="text-center text-sm text-gray-400">Dont have an account?{' '}<Link to="/register" className="text-green-600 hover:underline font-medium">Sign up now</Link></p>
          </div>
          <p className="text-center text-xs text-gray-400">© Raíces 2026</p>
        </div>
      </div>
    </>
  );
}

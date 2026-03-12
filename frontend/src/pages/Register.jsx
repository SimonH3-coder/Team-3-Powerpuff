import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, UserIcon, MailIcon, LockIcon } from '../components/Icons';

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
    if (!username.trim()) return setError('Username is required');
    if (password !== confirmPassword) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Something went wrong');
      else navigate('/');
    } catch (err) {
      setError('Could not connect to the server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="md:hidden min-h-screen bg-[#F4F6F4] flex flex-col font-sans">
        <div className="flex-1 flex flex-col justify-center px-5 py-6">
          <div className="bg-[#122d47] rounded-2xl px-6 py-8 flex flex-col gap-5">
            <div className="text-center">
              <h1 className="text-xl font-bold text-white leading-snug">Create your Account</h1>
              <p className="text-green-400 text-sm mt-1">Join us for a better future</p>
            </div>
            <div className="bg-white rounded-2xl px-5 py-4 flex flex-col gap-4">
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <UserIcon />
                <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full" />
              </div>
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <MailIcon />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full" />
              </div>
              <div className="flex items-center border-b border-gray-200 pb-2.5 gap-3">
                <LockIcon />
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full" />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="text-gray-400 flex-shrink-0">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
              </div>
              <div className="flex items-center gap-3">
                <LockIcon />
                <input type={showConfirm ? 'text' : 'password'} placeholder="Repeat password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="bg-transparent text-gray-700 placeholder-gray-400 text-sm outline-none w-full" />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="text-gray-400 flex-shrink-0">{showConfirm ? <EyeOffIcon /> : <EyeIcon />}</button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="button" onClick={handleRegister} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full py-3 text-sm transition-colors disabled:opacity-60">
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
            <p className="text-center text-xs text-gray-400">By signing up, you agree to our <span className="text-green-400">Terms</span> and <span className="text-green-400">Privacy Policy</span></p>
            <p className="text-center text-sm text-gray-400">Already have an account?{' '}<Link to="/login" className="text-green-400 font-medium hover:underline">Log in</Link></p>
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
            <h1 className="text-2xl font-normal text-gray-800 leading-snug">Welcome to <span className="font-bold text-green-700">our</span> Page</h1>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Username</label>
              <input type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Email</label>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} placeholder="Repeat password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showConfirm ? <EyeOffIcon /> : <EyeIcon />}</button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="button" onClick={handleRegister} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 text-sm transition-colors disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-400">Have an account?{' '}<Link to="/login" className="text-green-600 hover:underline font-medium">Sign in now</Link></p>
          </div>
          <p className="text-center text-xs text-gray-400">© Raíces 2026</p>
        </div>
      </div>
    </>
  );
}
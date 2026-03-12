import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex h-screen w-full font-sans">
      <div className="hidden md:block md:w-3/5 bg-cover bg-center" style={{ backgroundImage: "url('PaisajeGranCanaria.jpg')" }} />
      <div className="w-full md:w-2/5 flex flex-col justify-between bg-white px-10 py-8">
        <Link to="/" className="flex items-center gap-1.5 w-fit hover:opacity-80 transition-opacity">
          <span className="text-xl">🌍</span>
          <span className="font-semibold text-gray-800 text-base tracking-wide">Raíces</span>
          <span className="text-lg">🌿</span>
        </Link>
        <div className="flex flex-col gap-5 w-full max-w-xs mx-auto">
          <Link to="/login" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors w-fit -mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to login
          </Link>
          {!sent ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 leading-snug">Forgot password?</h1>
                <p className="text-sm text-gray-400 mt-1">No worries, we'll send you reset instructions.</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Email</label>
                <input type="email" placeholder="Enter your email" className="border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
              </div>
              <button type="button" onClick={() => setSent(true)} className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg py-3 text-sm transition-colors">Reset password</button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 text-3xl">✉️</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Check your email</h1>
                  <p className="text-sm text-gray-400 mt-2">We've sent password reset instructions to your inbox. Didn't receive it?{' '}<button type="button" onClick={() => setSent(false)} className="text-green-600 hover:underline font-medium">Try again</button></p>
                </div>
              </div>
              <Link to="/login" className="w-full text-center bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-lg py-3 text-sm transition-colors">Back to login</Link>
            </>
          )}
        </div>
        <p className="text-center text-xs text-gray-400">© Raíces 2026</p>
      </div>
    </div>
  );
}
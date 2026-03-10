import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import ecoLogo from "../assets/ecoIsland1logo.svg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              /* X icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Raíces home">
            <img src={ecoLogo} alt="Raíces logo" className="w-9 h-9 rounded-full" />
            <span className="text-xl font-bold tracking-tight text-navy hidden sm:inline">
              Raíces
            </span>
            <span className="text-xl font-bold tracking-tight text-navy sm:hidden">
              Raíces
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-sky rounded-lg px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="/news"
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-sky rounded-lg px-3 py-2"
            >
              News
            </Link>
            <Link
              to="/map"
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-sky rounded-lg px-3 py-2"
            >
              Map
            </Link>
          </nav>

          {/* Desktop action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-sky rounded px-1"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-white bg-green-accent hover:bg-green-accent-hover rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-accent focus:ring-offset-2"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile user icon */}
          <button
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky"
            aria-label="User account"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white">
          <Container>
            <nav className="flex flex-col gap-1 py-4" aria-label="Mobile navigation">
              <Link
                to="/"
                className="block py-2 px-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/news"
                className="block py-2 px-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link
                to="/map"
                className="block py-2 px-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Map
              </Link>
              <div className="border-t border-slate-100 my-1" />
              <Link
                to="/login"
                className="block py-2 px-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block py-2 px-3 rounded-lg text-base font-semibold text-white bg-green-accent hover:bg-green-accent-hover text-center transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}

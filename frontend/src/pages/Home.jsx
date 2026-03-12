import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import InfoStrip from "../components/InfoStrip";
import Footer from "../components/Footer";
import NavbarDesktop from "../components/NavbarDesktop";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-800 antialiased">
      <div>
        <NavbarDesktop />
      </div>
      <div className="sm:hidden">
        <Navbar />
      </div>

      <main className="flex-1">
        <Hero />
        <Features />
        <InfoStrip />
      </main>
      <Footer />
    </div>
  );
}

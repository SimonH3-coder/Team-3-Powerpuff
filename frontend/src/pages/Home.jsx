import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import InfoStrip from "../components/InfoStrip";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-800 antialiased">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <InfoStrip />
      </main>
      <Footer />
    </div>
  );
}

import Header from "../components/Header";
import Footer from "../components/Footer";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

const Map = () => {
  return (
    <div className="h-screen flex flex-col bg-white font-sans text-slate-800 antialiased">
      <Header />
      <main className="flex-1 min-h-0">
        <LeafletMap />
      </main>
      <Footer />
    </div>
  );
};

export default Map;

function LeafletMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" />;
}
import Header from "../components/Header";
import MapGuide from "../components/MapGuide";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState, useCallback } from "react";

const Map = () => {
  const [guideOpen, setGuideOpen] = useState(false);
  const openGuide = useCallback(() => setGuideOpen(true), []);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  return (
    <div className="map-page">
      <Header />
      <main className="map-wrapper" aria-label="Mapa interactivo de las Islas Canarias">
        {/* Leaflet map fills the entire wrapper */}
        <LeafletMap />

        {/* Branding badge — top-centre, non-interactive */}
        <div className="map-top-badge" aria-hidden="true">
          <span className="map-top-badge__icon">🌋</span>
          <div>
            <span className="map-top-badge__title">Islas Canarias</span>
            <span className="map-top-badge__sub">Explora el territorio natural</span>
          </div>
        </div>

        {/* Guide trigger button — bottom-left, clear of Leaflet controls */}
        <button
          className="map-guide-btn"
          onClick={openGuide}
          aria-label="Abrir guía del mapa"
          aria-haspopup="dialog"
          aria-expanded={guideOpen}
        >
          {/* Map / compass icon */}
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Guía del mapa</span>
        </button>

        {/* Guide panel (drawer on desktop, bottom-sheet on mobile) */}
        <MapGuide isOpen={guideOpen} onClose={closeGuide} />
      </main>
    </div>
  );
};

export default Map;

function LeafletMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Centred on the Canary Islands archipelago
    const map = L.map(containerRef.current, {
      center: [28.2916, -15.9665],
      zoom: 8,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Recalculate tile layout whenever the container is resized
    const ro = new ResizeObserver(() => {
      map.invalidateSize({ pan: false });
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="map-leaflet-container"
      role="application"
      aria-label="Mapa interactivo de las Islas Canarias"
    />
  );
}
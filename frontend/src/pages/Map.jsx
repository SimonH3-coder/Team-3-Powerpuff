import Header from "../components/Header";
import MapGuide from "../components/MapGuide";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState, useCallback } from "react";

// Available map layers
const LAYERS = [
  {
    id: "standard",
    label: "🗺️ Normal",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  },
  {
    id: "satellite",
    label: "🛰️ Satélite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
    maxZoom: 19,
  },
  {
    id: "terrain",
    label: "⛰️ Terreno",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17,
  },
  {
    id: "rain",
    label: "🌧️ Lluvia",
    url: "https://tilecache.rainviewer.com/v2/coverage/0/256/{z}/{x}/{y}/2/1_1.png",
    attribution: '&copy; <a href="https://rainviewer.com">RainViewer</a>',
    maxZoom: 19,
  },
];

const Map = () => {
  const [guideOpen, setGuideOpen] = useState(false);
  const openGuide = useCallback(() => setGuideOpen(true), []);
  const closeGuide = useCallback(() => setGuideOpen(false), []);

  return (
    <div className="map-page">
      <Header />
      <main className="map-wrapper" aria-label="Mapa interactivo de las Islas Canarias">
        <LeafletMap />

        <button
          className="map-guide-btn"
          onClick={openGuide}
          aria-label="Open map guide"
          aria-haspopup="dialog"
          aria-expanded={guideOpen}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Map guide</span>
        </button>

        <MapGuide isOpen={guideOpen} onClose={closeGuide} />
      </main>
    </div>
  );
};

export default Map;

function LeafletMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const tileLayerRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState("standard");

  // Popup state for clicked zone (forum integration - coming soon)
  const [clickedPlace, setClickedPlace] = useState(null);

  // Initialize the map only once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [28.2916, -15.9665],
      zoom: 8,
      zoomControl: true,
      attributionControl: true,
    });

    // Add default tile layer
    const defaultLayer = LAYERS.find((l) => l.id === "standard");
    tileLayerRef.current = L.tileLayer(defaultLayer.url, {
      attribution: defaultLayer.attribution,
      maxZoom: defaultLayer.maxZoom,
    }).addTo(map);

    // Click on map → show forum popup (coming soon)
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setClickedPlace({ lat: lat.toFixed(4), lng: lng.toFixed(4) });
    });

    mapRef.current = map;

    const ro = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Switch tile layer when activeLayer changes
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;

    const layer = LAYERS.find((l) => l.id === activeLayer);
    if (!layer) return;

    mapRef.current.removeLayer(tileLayerRef.current);
    tileLayerRef.current = L.tileLayer(layer.url, {
      attribution: layer.attribution,
      maxZoom: layer.maxZoom,
    }).addTo(mapRef.current);
  }, [activeLayer]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        className="map-leaflet-container"
        role="application"
        aria-label="Mapa interactivo de las Islas Canarias"
      />

      {/* Layer switcher */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: 1000,
          background: "white",
          borderRadius: "10px",
          padding: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <p style={{ margin: "0 0 4px 0", fontSize: "11px", fontWeight: "bold", color: "#555", textAlign: "center" }}>
          Capas
        </p>
        {LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id)}
            style={{
              padding: "5px 10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: activeLayer === layer.id ? "bold" : "normal",
              background: activeLayer === layer.id ? "#0e6b99" : "#f0f0f0",
              color: activeLayer === layer.id ? "white" : "#333",
            }}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* Forum popup - coming soon */}
      {clickedPlace && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            background: "white",
            borderRadius: "10px",
            padding: "12px 16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            maxWidth: "320px",
          }}
        >
          <span>📍 {clickedPlace.lat}, {clickedPlace.lng}</span>
          {/* TODO: conectar con el foro cuando esté listo */}
          <button
            disabled
            title="Próximamente disponible"
            style={{
              padding: "5px 10px",
              borderRadius: "6px",
              border: "none",
              background: "#ddd",
              color: "#999",
              cursor: "not-allowed",
              fontSize: "12px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            💬 Post al foro (próximamente)
          </button>
          <button
            onClick={() => setClickedPlace(null)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
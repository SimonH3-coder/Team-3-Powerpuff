import MapGuide from "../components/MapGuide";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const LAYERS = [
  { id: "standard", label: "Normal", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19 },
  { id: "satellite", label: "Satellite", url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", attribution: "Tiles &copy; Esri", maxZoom: 19 },
  { id: "terrain", label: "Terrain", url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>', maxZoom: 17 },
];

function LeafletMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const tileLayerRef = useRef(null);
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState("standard");
  const [clickedPlace, setClickedPlace] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [postMsg, setPostMsg] = useState("");

  function addPostMarker(map, lat, lng, postTitle, postId) {
    const marker = L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map);
    marker.bindPopup(`<b>${postTitle}</b><br><button id="goto-${postId}" style="color:#16a34a;font-weight:bold;background:none;border:none;cursor:pointer;padding:4px 0">View in Forum →</button>`);
    marker.on("popupopen", () => setTimeout(() => {
      document.getElementById(`goto-${postId}`)?.addEventListener("click", () => navigate("/forum"));
    }, 0));
  }

  async function loadForumMarkers(map) {
    try {
      const res = await fetch("http://localhost:3000/api/forum");
      const posts = await res.json();
      posts.forEach(post => {
        const m = post.content?.match(/📍 Location: (-?\d+\.\d+), (-?\d+\.\d+)/);
        if (m) addPostMarker(map, m[1], m[2], post.title || "Forum post", post.id);
      });
    } catch (e) {}
  }

  async function handlePost() {
    const token = localStorage.getItem("token");
    if (!token) { setPostMsg("You must be logged in to post."); return; }
    if (!title.trim()) { setPostMsg("Please enter a title."); return; }
    setPosting(true);
    setPostMsg("");
    try {
      const res = await fetch("http://localhost:3000/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ title, content: `📍 Location: ${clickedPlace.lat}, ${clickedPlace.lng}\n\n${content}` }),
      });
      const data = await res.json();
      if (!res.ok) { setPostMsg(data.error || "Something went wrong"); }
      else {
        setPostMsg("Posted!");
        if (data && data[0]?.id) addPostMarker(mapRef.current, clickedPlace.lat, clickedPlace.lng, title, data[0].id);
        setTimeout(() => { setClickedPlace(null); setShowForm(false); setTitle(""); setContent(""); setPostMsg(""); }, 1500);
      }
    } catch (e) {
      setPostMsg("Could not connect to server.");
    }
    setPosting(false);
  }

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const lat = parseFloat(searchParams.get("lat")) || 28.2916;
    const lng = parseFloat(searchParams.get("lng")) || -15.9665;
    const zoom = searchParams.get("lat") ? 14 : 8;
    const map = L.map(containerRef.current, { center: [lat, lng], zoom, zoomControl: true, attributionControl: true });
    if (searchParams.get("lat")) L.marker([lat, lng]).addTo(map).bindPopup("📍 From forum post").openPopup();
    const defaultLayer = LAYERS.find((l) => l.id === "standard");
    tileLayerRef.current = L.tileLayer(defaultLayer.url, { attribution: defaultLayer.attribution, maxZoom: defaultLayer.maxZoom }).addTo(map);
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setClickedPlace({ lat: lat.toFixed(4), lng: lng.toFixed(4) });
    });
    mapRef.current = map;
    loadForumMarkers(map);
    const ro = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    ro.observe(containerRef.current);
    return () => { ro.disconnect(); map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;
    const layer = LAYERS.find((l) => l.id === activeLayer);
    if (!layer) return;
    mapRef.current.removeLayer(tileLayerRef.current);
    tileLayerRef.current = L.tileLayer(layer.url, { attribution: layer.attribution, maxZoom: layer.maxZoom }).addTo(mapRef.current);
  }, [activeLayer]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} className="map-leaflet-container" role="application" aria-label="Interactive map of the Canary Islands" />
      <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 1000, background: "white", borderRadius: "10px", padding: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={{ margin: "0 0 4px 0", fontSize: "11px", fontWeight: "bold", color: "#555", textAlign: "center" }}>Layers</p>
        {LAYERS.map((layer) => (
          <button key={layer.id} onClick={() => setActiveLayer(layer.id)} style={{ padding: "5px 10px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: activeLayer === layer.id ? "bold" : "normal", background: activeLayer === layer.id ? "#0e6b99" : "#f0f0f0", color: activeLayer === layer.id ? "white" : "#333" }}>
            {layer.label}
          </button>
        ))}
      </div>
      {clickedPlace && (
        <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", zIndex: 1000, background: "white", borderRadius: "10px", padding: "12px 16px", boxShadow: "0 2px 10px rgba(0,0,0,0.25)", fontSize: "13px", minWidth: "300px", maxWidth: "340px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showForm ? "10px" : "0" }}>
            <span>📍 {clickedPlace.lat}, {clickedPlace.lng}</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button onClick={() => setShowForm(v => !v)} style={{ padding: "5px 10px", borderRadius: "6px", border: "none", background: "#16a34a", color: "white", cursor: "pointer", fontSize: "12px", fontWeight: "bold", whiteSpace: "nowrap" }}>💬 Post to Forum</button>
              <button onClick={() => { setClickedPlace(null); setShowForm(false); setTitle(""); setContent(""); setPostMsg(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", lineHeight: 1 }}>✕</button>
            </div>
          </div>
          {showForm && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "13px", outline: "none" }} />
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's happening here?" rows={3} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ddd", fontSize: "13px", resize: "none", outline: "none" }} />
              {postMsg && <p style={{ margin: 0, fontSize: "12px", color: postMsg === "Posted!" ? "green" : "red" }}>{postMsg}</p>}
              <button onClick={handlePost} disabled={posting} style={{ padding: "8px", borderRadius: "6px", border: "none", background: posting ? "#aaa" : "#16a34a", color: "white", cursor: posting ? "not-allowed" : "pointer", fontWeight: "bold", fontSize: "13px" }}>
                {posting ? "Posting..." : "Submit"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const Map = () => {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <div className="map-page">
      <main className="map-wrapper" aria-label="Interactive Map of the Canary Islands">
        <LeafletMap />
        <button className="map-guide-btn" onClick={() => setGuideOpen(true)} aria-label="Open map guide" aria-haspopup="dialog" aria-expanded={guideOpen}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>Map guide</span>
        </button>
        <MapGuide isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
      </main>
    </div>
  );
};

export default Map;
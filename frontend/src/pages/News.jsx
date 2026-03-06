import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE API
// ─────────────────────────────────────────────────────────────────────────────
// 1. Regístrate gratis en https://newsdata.io (plan gratuito disponible)
// 2. Copia tu API key del dashboard → "API Key"
// 3. Reemplaza el string de abajo con tu clave real
const NEWSDATA_API_KEY = "pub_b8e0af58a4604cefa2612ff975b9941c";
const NEWSDATA_BASE_URL = "https://newsdata.io/api/1/news";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE FILTROS
// Modifica las queries para personalizar qué noticias aparecen en cada tab
// ─────────────────────────────────────────────────────────────────────────────
const FILTERS = {
  all: {
    label: "All",
    icon: "🌿",
    // Broad sustainability feed for the Canary Islands
    query: `"Canary Islands" sustainability OR environment OR renewable OR biodiversity OR ocean OR conservation`,
  },
  climate: {
    label: "Climate",
    icon: "🌡️",
    query: `"Canary Islands" climate OR heatwave OR drought OR temperature OR emissions OR "global warming"`,
  },
  energy: {
    label: "Energy",
    icon: "⚡",
    query: `"Canary Islands" "renewable energy" OR solar OR wind OR photovoltaic OR "energy transition" OR hydrogen`,
  },
  biodiversity: {
    label: "Biodiversity",
    icon: "🦎",
    query: `"Canary Islands" biodiversity OR species OR habitat OR ecosystem OR fauna OR flora OR wildlife`,
  },
  ocean: {
    label: "Ocean",
    icon: "🌊",
    query: `"Canary Islands" ocean OR marine OR sea OR microplastics OR "plastic pollution" OR coastal OR fisheries`,
  },
  waste: {
    label: "Waste",
    icon: "♻️",
    query: `"Canary Islands" waste OR recycling OR garbage OR "circular economy" OR plastic OR pollution OR landfill`,
  },
  tourism: {
    label: "Tourism",
    icon: "🏔️",
    query: `"Canary Islands" "sustainable tourism" OR ecotourism OR "responsible tourism" OR visitors OR destination`,
  },
};

// Fallback images keyed by detected article CATEGORY (from getCategory)
const FALLBACK_IMAGES = {
  "Climate":               "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=1200&q=80",
  "Biodiversity":          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
  "Renewable Energy":      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
  "Ocean":                 "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80",
  "Waste":                 "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80",
  "Water":                 "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1200&q=80",
  "Conservation":          "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
  "Sustainable Tourism":   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "Wildfires":             "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=1200&q=80",
  "Policy":                "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
  "Community":             "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
  "Research":              "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&q=80",
  "General Sustainability":"https://images.unsplash.com/photo-1536625737227-92a1fc042939?w=1200&q=80",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function truncate(str, max) {
  if (!str || str.length <= max) return str ?? "";
  return str.slice(0, max).trimEnd() + "…";
}

function readingTime(text) {
  if (!text) return "1 min";
  return `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min`;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTO-CATEGORIZATION — keyword scoring engine
// Each rule has a list of detection keywords. The category with the most
// matched keywords wins. Ties go to the first match (priority order).
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_RULES = [
  {
    key: "Climate",
    icon: "🌡️",
    keywords: ["climate", "heatwave", "heat wave", "warming", "temperature", "emissions", "drought", "carbon", "greenhouse", "co2", "meteorolog", "weather extreme", "sea level"],
  },
  {
    key: "Biodiversity",
    icon: "🦎",
    keywords: ["biodiversity", "species", "habitat", "ecosystem", "fauna", "flora", "wildlife", "endemic", "extinction", "protected species", "native species", "biological diversity"],
  },
  {
    key: "Renewable Energy",
    icon: "⚡",
    keywords: ["renewable", "solar panel", "wind energy", "wind farm", "photovoltaic", "energy transition", "clean energy", "hydrogen", "turbine", "geothermal", "offshore wind", "megawatt", "kilowatt"],
  },
  {
    key: "Ocean",
    icon: "🌊",
    keywords: ["ocean", "marine", "coastal", "microplastics", "plastic pollution", "fisheries", "coral", "cetacean", "whale", "dolphin", "seawater", "shoreline", "maritime", "sea water", "underwater"],
  },
  {
    key: "Waste",
    icon: "♻️",
    keywords: ["waste", "recycling", "circular economy", "garbage", "landfill", "reuse", "litter", "trash", "composting", "single-use", "plastic bag", "packaging waste"],
  },
  {
    key: "Water",
    icon: "💧",
    keywords: ["water supply", "reservoir", "desalination", "aquifer", "groundwater", "hydrological", "irrigation", "water scarcity", "drinking water", "watershed", "water management"],
  },
  {
    key: "Conservation",
    icon: "🌳",
    keywords: ["conservation", "protected area", "national park", "natural reserve", "restoration", "reforestation", "rewilding", "sanctuary", "biosphere", "nature reserve", "natural heritage"],
  },
  {
    key: "Sustainable Tourism",
    icon: "🏔️",
    keywords: ["sustainable tourism", "ecotourism", "responsible tourism", "eco-friendly travel", "green tourism", "overtourism", "heritage tourism", "tourist impact", "low-impact travel"],
  },
  {
    key: "Wildfires",
    icon: "🔥",
    keywords: ["wildfire", "forest fire", "bushfire", "fire risk", "burned area", "firefighter", "fire season", "conflagration", "arson", "fire spread"],
  },
  {
    key: "Policy",
    icon: "🏛️",
    keywords: ["government", "regulation", "legislation", "policy", "european union", "directive", "parliament", "subsidy", "funding", "grant", "minister", "public plan"],
  },
  {
    key: "Community",
    icon: "🤝",
    keywords: ["community", "local action", "volunteer", "civic", "awareness campaign", "citizen", "grassroots", "activism", "youth program", "environmental education"],
  },
  {
    key: "Research",
    icon: "🔬",
    keywords: ["study", "research", "university", "scientists", "report", "survey", "findings", "analysis", "monitoring", "measurement", "scientific", "publication"],
  },
];

// Merge all text fields of an article into one lowercase string for matching
function normalizeText(article) {
  return [
    article.title,
    article.description,
    article.content,
    ...(Array.isArray(article.keywords) ? article.keywords : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

// Score each category and return the best match
function getCategory(article) {
  const text = normalizeText(article);
  let best = { key: "General Sustainability", icon: "🌿", score: 0 };

  for (const rule of CATEGORY_RULES) {
    const score = rule.keywords.reduce(
      (acc, kw) => acc + (text.includes(kw) ? 1 : 0),
      0
    );
    if (score > best.score) {
      best = { key: rule.key, icon: rule.icon, score };
    }
  }
  return best;
}

// Soft color palette per detected category — avoids Tailwind dynamic class issues
const BADGE_STYLES = {
  "Climate":                { bg: "#FFF3E0", text: "#C45500", border: "#FFCC80" },
  "Biodiversity":           { bg: "#E8F5E9", text: "#2E7D32", border: "#A5D6A7" },
  "Renewable Energy":       { bg: "#FFFDE7", text: "#B45309", border: "#FDE68A" },
  "Ocean":                  { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  "Waste":                  { bg: "#F0FDFA", text: "#0F766E", border: "#99F6E4" },
  "Water":                  { bg: "#E0F2FE", text: "#0369A1", border: "#7DD3FC" },
  "Conservation":           { bg: "#F0FDF4", text: "#15803D", border: "#86EFAC" },
  "Sustainable Tourism":    { bg: "#F5F3FF", text: "#6D28D9", border: "#C4B5FD" },
  "Wildfires":              { bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
  "Policy":                 { bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" },
  "Community":              { bg: "#FDF4FF", text: "#7E22CE", border: "#E9D5FF" },
  "Research":               { bg: "#EEF2FF", text: "#3730A3", border: "#C7D2FE" },
  "General Sustainability": { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7" },
};

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON LOADERS
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonFeatured() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden h-[420px] sm:h-[520px] bg-slate-200">
      <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200" />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
      <div className="h-52 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-2.5 bg-slate-200 rounded-full w-1/3" />
        <div className="h-4 bg-slate-200 rounded-full w-full" />
        <div className="h-4 bg-slate-200 rounded-full w-4/5" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2 mt-4" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURED CARD — artículo destacado principal
// ─────────────────────────────────────────────────────────────────────────────
function FeaturedCard({ article }) {
  const [imgError, setImgError] = useState(false);
  // Detect this article's real category — not the active tab
  const category = getCategory(article);
  const imgSrc =
    article.image_url && !imgError
      ? article.image_url
      : FALLBACK_IMAGES[category.key] ?? FALLBACK_IMAGES["General Sustainability"];

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden h-[420px] sm:h-[540px] shadow-2xl cursor-pointer news-card-featured"
      aria-label={`Leer artículo destacado: ${article.title}`}
    >
      {/* Imagen de fondo */}
      <img
        src={imgSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onError={() => setImgError(true)}
      />

      {/* Gradiente editorial en capas */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Badges superiores */}
      <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black bg-green-accent text-white shadow-lg tracking-wide uppercase">
          ⭐ Destacado
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold bg-white/15 text-white backdrop-blur-md border border-white/25">
          {category.icon} {category.key}
        </span>
      </div>

      {/* Contenido inferior */}
      <div className="relative px-6 py-7 sm:px-10 sm:py-9 text-white">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs text-white/60">
          {article.source_id && (
            <>
              <span className="font-bold text-sky uppercase tracking-widest text-[10px]">
                {article.source_id}
              </span>
              <span className="opacity-40">·</span>
            </>
          )}
          <span>{formatDate(article.pubDate)}</span>
          <span className="opacity-40">·</span>
          <span>{readingTime(article.description)} de lectura</span>
        </div>

        {/* Título */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight mb-3 group-hover:text-sky transition-colors duration-300 max-w-3xl">
          {truncate(article.title, 140)}
        </h2>

        {/* Descripción */}
        {article.description && (
          <p className="text-sm sm:text-base text-white/70 line-clamp-2 mb-6 max-w-2xl leading-relaxed">
            {truncate(article.description, 210)}
          </p>
        )}

        {/* CTA */}
        <span className="inline-flex items-center gap-2 text-sm font-bold text-sky group-hover:gap-3.5 transition-all duration-300">
          Leer artículo completo
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWS CARD — tarjetas del grid secundario
// ─────────────────────────────────────────────────────────────────────────────
function NewsCard({ article, index }) {
  const [imgError, setImgError] = useState(false);
  // Auto-detect this article's category via keyword scoring
  const category = getCategory(article);
  const badgeStyle = BADGE_STYLES[category.key] ?? BADGE_STYLES["General Sustainability"];
  const hasImg = article.image_url && !imgError;

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 70}ms` }}
      aria-label={`Leer: ${article.title}`}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden h-52 flex-shrink-0 bg-slate-100">
        {hasImg ? (
          <img
            src={article.image_url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/5 via-slate-50 to-green-accent/8">
            <span className="text-6xl opacity-25 select-none">{category.icon}</span>
          </div>
        )}

        {/* Overlay sutil en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Badge de categoría */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md backdrop-blur-sm border"
            style={{ background: badgeStyle.bg, color: badgeStyle.text, borderColor: badgeStyle.border }}
          >
            {category.icon} {category.key}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-2.5 text-[11px] leading-none">
          <span className="font-bold text-green-accent truncate max-w-[130px] uppercase tracking-wide">
            {article.source_id || "—"}
          </span>
          <span className="text-slate-200">·</span>
          <span className="text-slate-400 whitespace-nowrap">
            {formatDate(article.pubDate)}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-sm font-bold text-slate-800 leading-snug mb-2.5 group-hover:text-navy transition-colors line-clamp-3">
          {truncate(article.title, 105)}
        </h3>

        {/* Descripción */}
        <p className="text-xs text-slate-500 line-clamp-3 flex-1 leading-relaxed">
          {truncate(article.description, 170) ||
            "Haz clic para leer el artículo completo."}
        </p>

        {/* Footer de la card */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {readingTime(article.description)} lectura
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-green-accent group-hover:gap-2 transition-all duration-200">
            Leer más
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETUP CARD — visible cuando no se ha configurado la API key
// ─────────────────────────────────────────────────────────────────────────────
function SetupCard() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-green-accent/30 bg-gradient-to-br from-green-accent/5 to-sky/5 p-8 sm:p-14 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-accent/10 text-3xl mb-5 border border-green-accent/15">
        🗝️
      </div>
      <h3 className="text-lg font-extrabold text-slate-700 mb-2">
        Configura tu API Key
      </h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        Para cargar noticias en tiempo real, abre{" "}
        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono text-slate-700">
          src/pages/News.jsx
        </code>{" "}
        y reemplaza{" "}
        <code className="bg-green-accent/10 px-1.5 py-0.5 rounded text-xs font-mono text-green-accent">
          YOUR_API_KEY_HERE
        </code>{" "}
        con tu clave gratuita de{" "}
        <a
          href="https://newsdata.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-accent font-bold hover:underline"
        >
          newsdata.io
        </a>
        .
      </p>

      {/* Snippet de código */}
      <div className="bg-navy rounded-xl p-5 text-left font-mono text-xs max-w-sm mx-auto mb-6 shadow-inner">
        <p className="text-slate-500 mb-1">{"// línea 9 de News.jsx"}</p>
        <p>
          <span className="text-sky">const</span>{" "}
          <span className="text-white">NEWSDATA_API_KEY</span>{" "}
          <span className="text-slate-400">=</span>{" "}
          <span className="text-amber-400">"pub_xxxxxxxxxx"</span>
          <span className="text-slate-400">;</span>
        </p>
      </div>

      <a
        href="https://newsdata.io/register"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-accent text-white text-sm font-bold hover:bg-green-accent-hover transition-colors shadow-md shadow-green-accent/25"
      >
        Obtener API Key gratuita
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN NEWS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const noKey = !NEWSDATA_API_KEY || NEWSDATA_API_KEY === "YOUR_API_KEY_HERE";

  const fetchNews = useCallback(
    async (filter) => {
      if (noKey) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      // Construir parámetros de consulta
      // Cambia `language` para otros idiomas, o añade `country: "es"` para solo España
      const params = new URLSearchParams({
        apikey: NEWSDATA_API_KEY,
        q: FILTERS[filter].query,
        language: "en", // English articles only
        // country: "es",   // descomenta para restringir a España
        // category: "environment", // descomenta para filtrar por categoría de la API
        size: "10", // máximo permitido en el plan gratuito
      });

      try {
        const res = await fetch(`${NEWSDATA_BASE_URL}?${params}`);
        if (!res.ok) throw new Error(`HTTP ${res.status} — verifica tu API key`);
        const json = await res.json();
        if (json.status !== "success")
          throw new Error(json.message ?? "Error desconocido de la API");

        // Filtra artículos sin título o enlace válido
        setArticles(
          (json.results ?? []).filter((a) => a.title && a.link)
        );
      } catch (err) {
        setError(err.message ?? "No se pudo conectar con la API");
      } finally {
        setLoading(false);
      }
    },
    [noKey]
  );

  useEffect(() => {
    fetchNews(activeFilter);
  }, [activeFilter, fetchNews]);

  const featured = articles[0] ?? null;
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4] font-sans text-slate-800 antialiased">
      <Header />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
          {/* Blobs decorativos */}
          <div className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-green-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 right-0 w-[400px] h-[400px] rounded-full bg-sky/18 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 left-2/3 w-64 h-64 rounded-full bg-[#25CD39]/8 blur-2xl" />

          {/* Grid decorativo sutil */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge editorial animado */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-accent/15 text-green-accent text-[11px] font-black mb-7 border border-green-accent/25 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-accent animate-pulse" />
              Actualizado con noticias ambientales
            </div>

            {/* Título principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-5">
              Noticias{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #25CD39 0%, #6FA1B0 100%)",
                }}
              >
                sostenibles
              </span>
              <br />
              <span className="text-white/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
                de Canarias
              </span>
            </h1>

            <p className="max-w-xl mx-auto text-slate-300/85 text-base sm:text-lg leading-relaxed">
              Actualidad sobre clima, biodiversidad, energías renovables y
              conservación en las islas
            </p>

            {/* Indicadores decorativos */}
            <div className="mt-10 flex items-center justify-center gap-10 sm:gap-16">
              {[
                { value: "7", label: "Categorías" },
                { value: "🌊", label: "Océano & Mar" },
                { value: "🆓", label: "100% Gratis" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                    {s.value}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FILTER BAR ────────────────────────────────────────────────── */}
        <div className="sticky top-16 z-30 bg-white/97 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              {Object.entries(FILTERS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`
                    inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold
                    whitespace-nowrap flex-shrink-0 transition-all duration-200
                    outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-1
                    ${
                      activeFilter === key
                        ? "bg-navy text-white shadow-md shadow-navy/20 scale-[1.03]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
                    }
                  `}
                >
                  <span className="text-base leading-none">{cfg.icon}</span>
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT AREA ──────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">

          {/* Sin API key configurada */}
          {noKey && !loading && <SetupCard />}

          {/* Estado de carga */}
          {loading && (
            <div className="space-y-8">
              <SkeletonFeatured />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}

          {/* Error de API (excluyendo el de falta de clave) */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-5 text-3xl border border-red-100 shadow-sm">
                🌊
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-2">
                No se pudieron cargar las noticias
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mb-7 leading-relaxed">
                {error}
              </p>
              <button
                onClick={() => fetchNews(activeFilter)}
                className="px-6 py-2.5 rounded-full bg-green-accent text-white text-sm font-bold hover:bg-green-accent-hover active:scale-95 transition-all shadow-md shadow-green-accent/20"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Sin resultados */}
          {!loading && !error && !noKey && articles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-5">🌵</div>
              <h3 className="text-base font-bold text-slate-700 mb-2">
                Sin resultados por ahora
              </h3>
              <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                No articles found for &ldquo;
                {FILTERS[activeFilter].label}&rdquo;. Try another category
                or check back later.
              </p>
            </div>
          )}

          {/* Artículos */}
          {!loading && !error && articles.length > 0 && (
            <>
              {/* Artículo destacado */}
              <FeaturedCard article={featured} />

              {/* Divisor "Más noticias" */}
              {rest.length > 0 && (
                <div className="flex items-center gap-4 py-1">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap px-2">
                    Más noticias
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              )}

              {/* Grid de tarjetas */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article, i) => (
                    <NewsCard
                      key={`${article.link}-${i}`}
                      article={article}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── NOTA DE ATRIBUCIÓN ────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <p className="text-[11px] text-slate-400 text-center">
            Noticias proporcionadas por{" "}
            <a
              href="https://newsdata.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-accent transition-colors underline underline-offset-2"
            >
              NewsData.io
            </a>{" "}
            · Solo para uso informativo · Contenido de terceros
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

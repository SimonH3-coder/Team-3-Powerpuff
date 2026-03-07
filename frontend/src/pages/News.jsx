import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_KEY = "pub_b8e0af58a4604cefa2612ff975b9941c";
const API_URL = "https://newsdata.io/api/1/news";

const FILTERS = {
  all:          { label: "All",          icon: "���", query: `"Canary Islands" sustainability OR environment OR renewable OR biodiversity OR ocean OR conservation` },
  climate:      { label: "Climate",      icon: "���️", query: `"Canary Islands" climate OR heatwave OR drought OR temperature OR emissions OR "global warming"` },
  energy:       { label: "Energy",       icon: "⚡",  query: `"Canary Islands" "renewable energy" OR solar OR wind OR photovoltaic OR "energy transition" OR hydrogen` },
  biodiversity: { label: "Biodiversity", icon: "���", query: `"Canary Islands" biodiversity OR species OR habitat OR ecosystem OR fauna OR flora OR wildlife` },
  ocean:        { label: "Ocean",        icon: "���", query: `"Canary Islands" ocean OR marine OR sea OR microplastics OR "plastic pollution" OR coastal OR fisheries` },
  waste:        { label: "Waste",        icon: "♻️", query: `"Canary Islands" waste OR recycling OR garbage OR "circular economy" OR plastic OR pollution OR landfill` },
  tourism:      { label: "Tourism",      icon: "���️", query: `"Canary Islands" "sustainable tourism" OR ecotourism OR "responsible tourism" OR visitors OR destination` },
};

const FALLBACK_IMAGES = {
  "Climate":             "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=1200&q=80",
  "Biodiversity":        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
  "Renewable Energy":    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
  "Ocean":               "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80",
  "Waste":               "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80",
  "Conservation":        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
  "Sustainable Tourism": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  "Wildfires":           "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=1200&q=80",
  "Policy":              "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80",
  "General":             "https://images.unsplash.com/photo-1536625737227-92a1fc042939?w=1200&q=80",
};

const CATEGORY_RULES = [
  { key: "Climate",             icon: "���️", words: ["climate","heatwave","warming","temperature","emissions","drought","carbon","co2"] },
  { key: "Biodiversity",        icon: "���", words: ["biodiversity","species","habitat","ecosystem","fauna","flora","wildlife","endemic"] },
  { key: "Renewable Energy",    icon: "⚡",  words: ["renewable","solar","wind energy","photovoltaic","energy transition","clean energy","hydrogen"] },
  { key: "Ocean",               icon: "���", words: ["ocean","marine","coastal","microplastics","fisheries","coral","whale","dolphin"] },
  { key: "Waste",               icon: "♻️", words: ["waste","recycling","circular economy","garbage","landfill","litter","composting"] },
  { key: "Conservation",        icon: "���", words: ["conservation","national park","natural reserve","reforestation","biosphere","sanctuary"] },
  { key: "Sustainable Tourism", icon: "���️", words: ["sustainable tourism","ecotourism","responsible tourism","overtourism"] },
  { key: "Wildfires",           icon: "���", words: ["wildfire","forest fire","bushfire","firefighter","fire season"] },
  { key: "Policy",              icon: "���️", words: ["government","regulation","legislation","policy","parliament","minister"] },
];

function getCategory(article) {
  const text = [article.title, article.description, article.content]
    .filter(Boolean).join(" ").toLowerCase();
  let best = { key: "General", icon: "���", score: 0 };
  for (const rule of CATEGORY_RULES) {
    const score = rule.words.reduce((n, w) => n + (text.includes(w) ? 1 : 0), 0);
    if (score > best.score) best = { ...rule, score };
  }
  return best;
}

function formatDate(str) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function truncate(str, max) {
  if (!str || str.length <= max) return str ?? "";
  return str.slice(0, max).trimEnd() + "…";
}

function readingTime(text) {
  if (!text) return "1 min";
  return `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min`;
}

function FeaturedCard({ article }) {
  const [imgError, setImgError] = useState(false);
  const cat = getCategory(article);
  const img = article.image_url && !imgError
    ? article.image_url
    : FALLBACK_IMAGES[cat.key] ?? FALLBACK_IMAGES["General"];

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden h-[420px] sm:h-[540px] shadow-2xl cursor-pointer news-card-featured"
      aria-label={`Read featured article: ${article.title}`}
    >
      <img
        src={img}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={() => setImgError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

      <div className="absolute top-5 left-5 flex gap-2">
        <span className="px-3 py-1.5 rounded-full text-[11px] font-black bg-green-accent text-white uppercase tracking-wide">
          ⭐ Featured
        </span>
        <span className="px-2.5 py-1.5 rounded-full text-[11px] font-semibold bg-white/15 text-white border border-white/25">
          {cat.icon} {cat.key}
        </span>
      </div>

      <div className="relative px-6 py-7 sm:px-10 sm:py-9 text-white">
        <div className="flex gap-3 mb-4 text-xs text-white/60">
          {article.source_id && (
            <span className="font-bold uppercase tracking-widest text-sky text-[10px]">{article.source_id}</span>
          )}
          <span>{formatDate(article.pubDate)}</span>
          <span>{readingTime(article.description)} read</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold leading-tight mb-3 group-hover:text-sky transition-colors max-w-3xl">
          {truncate(article.title, 140)}
        </h2>
        {article.description && (
          <p className="text-sm text-white/70 line-clamp-2 mb-6 max-w-2xl">
            {truncate(article.description, 210)}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-sm font-bold text-sky group-hover:gap-3.5 transition-all">
          Read full article →
        </span>
      </div>
    </a>
  );
}

function NewsCard({ article, index }) {
  const [imgError, setImgError] = useState(false);
  const cat = getCategory(article);

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative h-52 bg-slate-100 flex-shrink-0 overflow-hidden">
        {article.image_url && !imgError ? (
          <img
            src={article.image_url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-25">{cat.icon}</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200 shadow-sm">
            {cat.icon} {cat.key}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex gap-2 mb-2 text-[11px]">
          <span className="font-bold text-green-accent uppercase truncate max-w-[130px]">{article.source_id || "—"}</span>
          <span className="text-slate-400">{formatDate(article.pubDate)}</span>
        </div>
        <h3 className="text-sm font-bold text-slate-800 line-clamp-3 mb-2 group-hover:text-navy transition-colors">
          {truncate(article.title, 105)}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-3 flex-1">
          {truncate(article.description, 170) || "Click to read the full article."}
        </p>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">{readingTime(article.description)} read</span>
          <span className="text-xs font-bold text-green-accent group-hover:underline">Read more →</span>
        </div>
      </div>
    </a>
  );
}

function SkeletonFeatured() {
  return <div className="animate-pulse rounded-2xl h-[420px] bg-slate-200" />;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-white shadow-sm border border-slate-100">
      <div className="h-52 bg-slate-200 rounded-t-2xl" />
      <div className="p-5 space-y-3">
        <div className="h-2.5 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchNews = useCallback(async (filter) => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      apikey: API_KEY,
      q: FILTERS[filter].query,
      language: "en",
      size: "10",
    });
    try {
      const res = await fetch(`${API_URL}?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} — check your API key`);
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message ?? "Unknown API error");
      setArticles((json.results ?? []).filter((a) => a.title && a.link));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(activeFilter);
  }, [activeFilter, fetchNews]);

  const featured = articles[0] ?? null;
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4] font-sans text-slate-800 antialiased">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
          <div className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-green-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 right-0 w-[400px] h-[400px] rounded-full bg-sky/18 blur-3xl" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-accent/15 text-green-accent text-[11px] font-black mb-7 border border-green-accent/25 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-accent animate-pulse" />
              Updated with environmental news
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Sustainable{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #25CD39 0%, #6FA1B0 100%)" }}
              >
                News
              </span>
              <br />
              <span className="text-white/90 text-3xl sm:text-5xl font-bold">
                from the Canary Islands
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-slate-300/85 text-base sm:text-lg">
              Latest on climate, biodiversity, renewable energy and conservation on the islands
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <div className="sticky top-16 z-30 bg-white/97 backdrop-blur-md border-b border-slate-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              {Object.entries(FILTERS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-green-accent ${
                    activeFilter === key
                      ? "bg-navy text-white shadow-md scale-[1.03]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span className="text-base">{cfg.icon}</span>
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
          {loading && (
            <div className="space-y-8">
              <SkeletonFeatured />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)}
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-5 text-3xl border border-red-100">
                ���
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-2">Could not load news</h3>
              <p className="text-sm text-slate-500 max-w-sm mb-7">{error}</p>
              <button
                onClick={() => fetchNews(activeFilter)}
                className="px-6 py-2.5 rounded-full bg-green-accent text-white text-sm font-bold hover:bg-green-accent-hover transition-all shadow-md"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="text-6xl mb-5">���</div>
              <h3 className="text-base font-bold text-slate-700 mb-2">No results right now</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                No articles found for &ldquo;{FILTERS[activeFilter].label}&rdquo;. Try another category or check back later.
              </p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <FeaturedCard article={featured} />

              {rest.length > 0 && (
                <div className="flex items-center gap-4 py-1">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                    More news
                  </span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article, i) => (
                    <NewsCard key={`${article.link}-${i}`} article={article} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Attribution */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <p className="text-[11px] text-slate-400 text-center">
            News provided by{" "}
            <a
              href="https://newsdata.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-accent underline underline-offset-2"
            >
              NewsData.io
            </a>{" "}
            · For informational use only · Third-party content
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

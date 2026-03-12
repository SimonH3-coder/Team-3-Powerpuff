import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;
const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q="Canary Islands" sustainability OR environment OR renewable OR biodiversity OR ocean OR conservation&language=en&size=10`;
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1536625737227-92a1fc042939?w=1200&q=80";

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
  const img = article.image_url && !imgError ? article.image_url : FALLBACK_IMAGE;
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col justify-end rounded-2xl overflow-hidden h-[420px] sm:h-[540px] shadow-2xl cursor-pointer news-card-featured" aria-label={`Read featured article: ${article.title}`}>
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={() => setImgError(true)} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
      <div className="relative px-6 py-7 sm:px-10 sm:py-9 text-white">
        <div className="flex gap-3 mb-4 text-xs text-white/60">
          {article.source_id && <span className="font-bold uppercase tracking-widest text-sky text-[10px]">{article.source_id}</span>}
          <span>{formatDate(article.pubDate)}</span>
          <span>{readingTime(article.description)} read</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold leading-tight mb-3 group-hover:text-sky transition-colors max-w-3xl">{truncate(article.title, 140)}</h2>
        {article.description && <p className="text-sm text-white/70 line-clamp-2 mb-6 max-w-2xl">{truncate(article.description, 210)}</p>}
        <span className="inline-flex items-center gap-2 text-sm font-bold text-sky group-hover:gap-3.5 transition-all">Read full article →</span>
      </div>
    </a>
  );
}

function NewsCard({ article, index }) {
  const [imgError, setImgError] = useState(false);
  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-card group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="relative h-52 bg-slate-100 flex-shrink-0 overflow-hidden">
        {article.image_url && !imgError
          ? <img src={article.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} />
          : <div className="w-full h-full flex items-center justify-center bg-slate-100"><img src={FALLBACK_IMAGE} alt="" className="w-full h-full object-cover opacity-40" /></div>
        }
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex gap-2 mb-2 text-[11px]">
          <span className="font-bold text-green-accent uppercase truncate max-w-[130px]">{article.source_id || "—"}</span>
          <span className="text-slate-400">{formatDate(article.pubDate)}</span>
        </div>
        <h3 className="text-sm font-bold text-slate-800 line-clamp-3 mb-2 group-hover:text-navy transition-colors">{truncate(article.title, 105)}</h3>
        <p className="text-xs text-slate-500 line-clamp-3 flex-1">{truncate(article.description, 170) || "Click to read the full article."}</p>
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

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.status !== "success") throw new Error(json.message ?? "API error");
        setArticles((json.results ?? []).filter((a) => a.title && a.link));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const featured = articles[0] ?? null;
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4] font-sans text-slate-800 antialiased">
      <main className="flex-1">
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
              <h3 className="text-base font-bold text-slate-700 mb-2">Could not load news</h3>
              <p className="text-sm text-slate-500 max-w-sm mb-7">{error}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2.5 rounded-full bg-green-accent text-white text-sm font-bold hover:bg-green-accent-hover transition-all shadow-md">Retry</button>
            </div>
          )}
          {!loading && !error && articles.length === 0 && (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="text-6xl mb-5">🌵</div>
              <h3 className="text-base font-bold text-slate-700 mb-2">No results right now</h3>
              <p className="text-sm text-slate-500 max-w-sm">No articles found. Check back later.</p>
            </div>
          )}
          {!loading && !error && articles.length > 0 && (
            <>
              <FeaturedCard article={featured} />
              {rest.length > 0 && (
                <div className="flex items-center gap-4 py-1">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">More news</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article, i) => <NewsCard key={`${article.link}-${i}`} article={article} index={i} />)}
                </div>
              )}
            </>
          )}
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <p className="text-[11px] text-slate-400 text-center">
            News provided by{" "}
            <a href="https://newsdata.io" target="_blank" rel="noopener noreferrer" className="hover:text-green-accent underline underline-offset-2">NewsData.io</a>{" "}
            · For informational use only · Third-party content
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

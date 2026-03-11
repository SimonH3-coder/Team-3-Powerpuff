
import { useNavigate } from "react-router-dom";

export default function ForumPost({ post }) {
  const {
    content = "",
    image_url: imageUrl = "",
    likes = 0,
    reposts = 0,
    profiles,
  } = post;

  const username = profiles?.username ?? "anonymous";
  const avatar = profiles?.avatar_url ?? null;
  const navigate = useNavigate();

  const coordMatch = content.match(/📍 Location: (-?\d+\.\d+), (-?\d+\.\d+)/);
  const displayContent = coordMatch ? content.replace(/📍 Location: -?\d+\.\d+, -?\d+\.\d+\n\n?/, "") : content;

  return (
    <div className="w-92.5 sm:w-full sm:max-w-xl rounded-3xl p-6 bg-[#1a3a5c] shadow-xl font-['Poppins']">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar || "https://placehold.co/40x40?text=%40"}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-white font-semibold text-sm">@{username}</span>
      </div>

      {/* Coordinates link */}
      {coordMatch && (
        <button
          onClick={() => navigate(`/map?lat=${coordMatch[1]}&lng=${coordMatch[2]}`)}
          className="flex items-center gap-1 text-[#4ade80] text-xs font-semibold mb-3 hover:underline"
        >
          📍 {coordMatch[1]}, {coordMatch[2]} — View on map
        </button>
      )}

      {/* Content */}
      <p className="text-white text-lg font-medium text-center mb-4 leading-snug">
        {displayContent}
      </p>

      {/* Image */}
      {imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-4">
          <img
            src={imageUrl}
            alt="post"
            className="w-full max-h-64 object-cover"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 px-1">
        <button className="flex items-center gap-2 text-[#4ade80] font-semibold text-sm hover:opacity-75 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
          {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}
        </button>

        <button className="flex items-center gap-2 text-[#4ade80] font-semibold text-sm hover:opacity-75 transition-opacity">
          {reposts >= 1000 ? `${(reposts / 1000).toFixed(1)}k` : reposts}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
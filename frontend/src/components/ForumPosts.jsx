
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForumPost({ post, currentUserId, onDelete, onRefresh }) {
  const { id, content = "", image_url: imageUrl = "", likes = 0, reposts = 0, profiles, poster_id, likedByUser = false } = post;
  const username = profiles?.username ?? "anonymous";
  const avatar = profiles?.avatar_url ?? null;
  const navigate = useNavigate();

  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(likedByUser);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const coordMatch = content.match(/📍 Location: (-?\d+\.\d+), (-?\d+\.\d+)/);
  const displayContent = coordMatch ? content.replace(/📍 Location: -?\d+\.\d+, -?\d+\.\d+\n\n?/, "") : content;
  const isOwner = currentUserId && currentUserId === poster_id;

  async function handleLike() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forum/${id}/like`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      setLiked(data.liked);
      setLikeCount(data.likes);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forum/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok && onDelete) onDelete(id);
  }

  async function handleEdit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/api/forum/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ content: editContent }),
    });
    setEditing(false);
    if (onRefresh) onRefresh();
  }

  return (
    <div className="w-full max-w-xl rounded-3xl p-6 bg-[#1a3a5c] shadow-xl font-['Poppins']">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={avatar || "https://placehold.co/40x40?text=%40"} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-white font-semibold text-sm">@{username}</span>
        </div>
        {isOwner && !editing && (
          <div className="flex gap-3">
            <button onClick={() => setEditing(true)} className="text-white/50 text-xs hover:text-white">Edit</button>
            <button onClick={handleDelete} className="text-red-400 text-xs hover:text-red-300">Delete</button>
          </div>
        )}
      </div>

      {/* Coordinates link */}
      {coordMatch && (
        <button onClick={() => navigate(`/map?lat=${coordMatch[1]}&lng=${coordMatch[2]}`)} className="flex items-center gap-1 text-[#4ade80] text-xs font-semibold mb-3 hover:underline">
          📍 {coordMatch[1]}, {coordMatch[2]} — View on map
        </button>
      )}

      {/* Content or edit form */}
      {editing ? (
        <form onSubmit={handleEdit} className="flex flex-col gap-2 mb-4">
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="w-full bg-white/10 text-white text-sm rounded-lg p-3 outline-none resize-none" rows={3} />
          <div className="flex gap-2">
            <button type="submit" className="bg-[#4ade80] text-[#1a3a5c] text-xs font-semibold rounded-lg px-4 py-1.5">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="text-white/50 text-xs hover:text-white">Cancel</button>
          </div>
        </form>
      ) : (
        <p className="text-white text-lg font-medium text-center mb-4 leading-snug">{displayContent}</p>
      )}

      {/* Image */}
      {imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-4">
          <img src={imageUrl} alt="post" className="w-full max-h-64 object-cover" />
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 px-1">
        <button onClick={handleLike} className={`flex items-center gap-2 font-semibold text-sm transition-opacity ${liked ? "text-red-400" : "text-[#4ade80] hover:opacity-75"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
          {likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}
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
import { useState, useEffect } from "react";
import ForumPost from "./ForumPosts";

export default function ForumFeed({ searchQuery = "" }) {
  const [posts, setPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  function loadPosts() {
    const url = currentUser?.id ? `/api/forum?userId=${currentUser.id}` : "/api/forum";
    fetch(url)
      .then(res => res.json())
      .then(data => setPosts(data));
  }

  useEffect(() => { loadPosts(); }, []);

  function handleDelete(id) {
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  const filtered = posts.filter(post =>
    post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.profiles?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center gap-4 py-6 w-full overflow-x-hidden px-4">
      {filtered.length === 0 && searchQuery && (
        <p className="text-gray-400 text-sm">No posts found for "{searchQuery}"</p>
      )}
      {filtered.map(post => (
        <ForumPost key={post.id} post={post} currentUserId={currentUser?.id} onDelete={handleDelete} onRefresh={loadPosts} />
      ))}
    </div>
  );
}
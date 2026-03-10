import { useState, useEffect } from "react";
import ForumPost from "./ForumPosts";

export default function ForumFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/forum")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {posts.map(post => (
        <ForumPost key={post.id} post={post} />
      ))}
    </div>
  );
}
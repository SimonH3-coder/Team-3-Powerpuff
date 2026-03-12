import SearchBarForum from "../components/SearchBarForum";
import CreatePost from "../components/CreatePost";
import ForumFeed from "../components/ForumFeed";
import { useState, useCallback } from "react";
import PostOfTheDay from "../components/PostOftheDay";
import ErrorToast from "../components/ErrorToast";

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState(null);

  const handlePostFinish = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div>

      <SearchBarForum onSearch={setSearchQuery} />
      <PostOfTheDay />
      <CreatePost onFinish={handlePostFinish} onError={setToast} />
      <ForumFeed key={refreshKey} searchQuery={searchQuery} onError={setToast} />
      <ErrorToast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}

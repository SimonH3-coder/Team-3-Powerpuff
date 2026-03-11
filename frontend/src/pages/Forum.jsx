import Header from "../components/Header";
import SearchBarForum from "../components/SearchBarForum";
import CreatePost from "../components/CreatePost";
import ForumFeed from "../components/ForumFeed";
import { useState, useCallback } from "react";

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostFinish = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div>
      <Header />
      <SearchBarForum onSearch={setSearchQuery} />
      <CreatePost onFinish={handlePostFinish} />
      <ForumFeed key={refreshKey} searchQuery={searchQuery} />
    </div>
  );
}
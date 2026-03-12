import Header from "../components/Header";
import SearchBarForum from "../components/SearchBarForum";
import CreatePost from "../components/CreatePost";
import ForumFeed from "../components/ForumFeed";
import { useState, useCallback } from "react";
import PostOfTheDay from "../components/PostOftheDay";
import Navbar from "../components/Navbar";
import NavbarDesktop from "../components/NavbarDesktop";

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostFinish = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div>
      <Navbar />
      <NavbarDesktop />
      <SearchBarForum onSearch={setSearchQuery} />
      <PostOfTheDay />
      <CreatePost onFinish={handlePostFinish} />
      <ForumFeed key={refreshKey} searchQuery={searchQuery} />
    </div>
  );
}

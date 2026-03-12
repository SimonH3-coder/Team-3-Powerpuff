import Header from "../components/Header";
import SearchBarForum from "../components/SearchBarForum";
import CreatePost from "../components/CreatePost";
import ForumFeed from "../components/ForumFeed";
import { useState, useCallback } from "react";
import PostOfTheDay from "../components/PostOftheDay";
import Navbar from "../components/Navbar";
<<<<<<< HEAD
import NavbarDesktop from "../components/NavbarDesktop";
=======
import ErrorToast from "../components/ErrorToast";
>>>>>>> d9b1faadd1b225710b1a538ece096e507beaeda7

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState(null);

  const handlePostFinish = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
<<<<<<< HEAD
    <div>
      <Navbar />
      <NavbarDesktop />
=======
    <div className="overflow-x-hidden">
      <Header />
      <Navbar/>
>>>>>>> d9b1faadd1b225710b1a538ece096e507beaeda7
      <SearchBarForum onSearch={setSearchQuery} />
      <PostOfTheDay />
      <CreatePost onFinish={handlePostFinish} onError={setToast} />
      <ForumFeed key={refreshKey} searchQuery={searchQuery} onError={setToast} />
      <ErrorToast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}

import Header from "../components/Header";
import SearchBarForum from "../components/SearchBarForum";
import CreatePost from "../components/CreatePost"
import ForumFeed from "../components/ForumFeed";
import { useState } from "react";


export default function Forum() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Header />
      <SearchBarForum onSearch={setSearchQuery} />
      <CreatePost />
      <ForumFeed searchQuery={searchQuery} />
    </div>
  );
}

import Header from "../components/Header";
import SearchBarForum from "../components/SearchBarForum";
import CreatePost from "../components/CreatePost"
import ForumPost from "../components/ForumPosts";
import ForumFeed from "../components/ForumFeed";

export default function Forum() {
  return (
    <div>
        <Header />
        <SearchBarForum />
        <CreatePost />
        <ForumPost />
        <ForumFeed />
    </div>
  );
}

import Header from "../components/Header";
import SearchBarForum from "../components/SearchBarForum";
import CreatePost from "../components/CreatePost";

export default function Forum() {
  return (
    <div>
        <Header />
        <SearchBarForum />
        <CreatePost />
    </div>
  );
}

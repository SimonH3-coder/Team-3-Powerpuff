import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../components/profileImage';
import WeatherBar from '../components/Weatherbar';
import Header from "../components/Header";
import ForumPost from "../components/ForumPosts";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        fetch('/api/profiles', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setProfile(data);
                    return fetch(`/api/forum/user/${data.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                }
            })
            .then(res => res?.ok ? res.json() : null)
            .then(data => { if (data) setPosts(data); })
            .catch(() => {});
    }, []);

    return(
        <>
        <Header />
        <ProfileImage
            username={profile?.username}
            avatarUrl={profile?.avatar_url}
            bio={profile?.bio}
        />
        <WeatherBar />
          <div className="flex flex-col items-center gap-4 py-6">
            <h2 className="text-lg font-semibold text-navy">Your Posts</h2>
            {posts.length === 0 && (
                <p className="text-gray-400 text-sm">No posts yet.</p>
            )}
            {posts.map(post => (
                <ForumPost key={post.id} post={post} />
            ))}
        </div>
        </>
    )
}
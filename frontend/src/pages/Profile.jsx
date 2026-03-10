import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../components/profileImage';
import WeatherBar from '../components/Weatherbar';
import Header from "../components/Header";
import ForumPost from "../components/ForumPosts";

export default function Profile() {
    return(
        <>
        <Header />
        <ProfileImage />
        <WeatherBar />
        <ForumPost />
        </>
    )
}
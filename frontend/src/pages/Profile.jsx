import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../components/profileImage';
import WeatherBar from '../components/Weatherbar';
import Header from "../components/Header";

export default function Profile() {
    return(
        <>
        <Header />
        <ProfileImage />
        <WeatherBar />
        </>
    )
}
import React from 'react';
import PostSite from '../../components/postSite/PostSite';
import Profile from '../../components/profile/Profile';
import RightSite from '../../components/rightSite/RightSite';
import './home.css'
const Home = () => {
    return (
        <div className="home">
            <Profile/>
            <PostSite/>
            <RightSite/>
        </div>
    );
};

export default Home;
import React from 'react';
import ProfileLeft from '../../components/profileLeft/ProfileLeft';
import './profilepage.css'
import ProfileCard from '../../components/profileCard/ProfileCard'
import PostSite from '../../components/postSite/PostSite'
import RightSite from '../../components/rightSite/RightSite';
const ProfilePage = () => {
    return (
        <div className='profilePage_container'>
            <ProfileLeft/>

            <div className="profilePage_center">
                <ProfileCard/>
                <PostSite/>
            </div>

            <RightSite/>

        </div>
    );
};

export default ProfilePage;
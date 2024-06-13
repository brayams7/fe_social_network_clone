import React from 'react';
import './profile.css'
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../profileCard/ProfileCard';
import FollowersCard from '../followersCard/FollowersCard';

const Profile = () => {
    return (
        <div className="profile_side">
            <LogoSearch/>
            <ProfileCard/>
            <FollowersCard/>
        </div>
    );
};

export default Profile;
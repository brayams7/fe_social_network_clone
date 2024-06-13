import React from 'react';
import { listFollowers } from '../../data/followersData';
import './followersCard.css'
const FollowersCard = () => {
    return (
        <div className='followers_card_container'>
            <h3>Quines te siguen</h3>

            {
                listFollowers.map((profile, index)=>{
                    return(
                        <div className="follower" key={index}>
                            <div>
                                <img 
                                    src={profile.img} 
                                    alt="profile" 
                                    className='follower_img'
                                />
                                <div className="follower_name">
                                    <span>{profile.name}</span>
                                    <span>{profile.username}</span>
                                </div>
                            </div>
                            <button type='button' className='button_util button_cm'>
                                Follow
                            </button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default FollowersCard;
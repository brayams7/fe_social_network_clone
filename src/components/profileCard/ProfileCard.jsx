import React from "react";

import Cover from "../../assets/img/img/cover.jpg";
import ProfileDefault from "../../assets/img/img/profile_default.png";

import "./profileCard.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MySkeleton from "../utils/Loader/MySkeleton";
import { useGetCountPostsUserQuery } from "../../services/apiSliceUser";

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.auth.user)
  // const user = getUserDataCookie()
  const { id } = useParams()
  const isMyProfile = user?._id === id
  const {isError, isFetching, data:count} = useGetCountPostsUserQuery(id)

  if ((Object.entries(user).length === 0) || (isFetching && !count)) {
    return(
      <React.Fragment>
        <MySkeleton />
        <MySkeleton />
        <MySkeleton />
      </React.Fragment>
    )
  }


  return (
    <div className="profile_card_container">
      <div className="profile_card_images">
        <img src={user.coverPicture ? user.coverPicture : Cover} alt="cover" />
        <img
          src={user.profilePicture ? user.profilePicture : ProfileDefault}
          alt="profile"
        />
      </div>

      <div className="profile_card_name">
        <span>
          {user?.firstName} {user?.lastName}
        </span>

        { user?.detailProfile?.about 
          ? user?.detailProfile?.about
          : "Agrega una descripción"}
        <span></span>
      </div>

      <div className="profile_card_follow-status">
        <hr />
        <div>
          <div className="count_followings">
            <span>{user?.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="count_followings">
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>

          {isMyProfile && (
            <React.Fragment>
              <div className="vl"></div>
              <div className="count_followings">
                {
                  !isError && (
                    <React.Fragment>
                      <span>{count.countPosts}</span>
                      <span>Posts</span>
                    </React.Fragment>
                  )
                }
                
              </div>
            </React.Fragment>
          )}
        </div>
        <hr />
      </div>

      {!isMyProfile && (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user?._id}`}
          >
            My profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;

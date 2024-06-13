import React, { useEffect, useMemo, useState } from "react";
import "./post.css";
import Comment from "../../assets/img/img/comment.png";
import Share from "../../assets/img/img/share.png";
import Heart from "../../assets/img/img/like.png";
import NotLike from "../../assets/img/img/notlike.png";
import {
  useGetPostUMutation,
  useLikePostMutation,
} from "../../services/apiSlicePosts";

import Tooltip from "../utils/tooltip/Tooltip";

import ProfileDefault from "../../assets/img/img/profile_default.png";
import Followers from "../../assets/img/socialMedia/followers.png";

let filterTimeout;

const typesLike = {
  unliked: {
    message: "Post unliked",
    value: false,
  },
  liked: {
    message: "Post liked",
    value: true,
  },
};
const Post = ({ post, user }) => {
  const [likePost] = useLikePostMutation();
  const [getPost] = useGetPostUMutation();
  // const dispatch = useDispatch()
  const [liked, setLiked] = useState(false);
  // const [clickLiked, setClickLiked] = useState()

  const [likes, setLikes] = useState(post.likes.length ?? 0);

  const handleLiked = () => {
    const existUserInPost = post.likes.find(
      (value) => value.idUser === user._id
    );

    const totalLikes = post.likes.length;
    const iLiked = !liked;
    if (iLiked) {
      setLiked(true);
      if (existUserInPost) setLikes(totalLikes);
      else setLikes(totalLikes + 1);
    }
    if (!iLiked) {
      setLiked(false);
      if (existUserInPost) setLikes(likes - 1 < 0 ? 0 : totalLikes - 1);
      else setLikes(totalLikes);
    }

    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(async () => {
      const response = await likePost({
        idPost: post._id,
        body: { idUser: user._id, like: !liked },
      });

      if (response.data?.code === 200) {
        const like = response.data?.message === typesLike.liked.message;

        getPost({ postId: post._id, like }).then((response) => {
          if (response.data?.code === 200) {
            const likes = response.data.data.likes;
            setLiked(like);
            setLikes(likes.length);
          }
        });
      }
    }, 1000);
  };

  const extraInfoUser = useMemo(() => {
    const extraInfo = {
      isFollowing: false,
      isMe: false,
    };
    const followings = post.following || [];

    if (post) {
      const isfollowing = followings.find(
        (following) => following._id === user._id
      );
      extraInfo.isFollowing = isfollowing ? true : false;
      extraInfo.isMe = post.userId === user._id;
    }

    return extraInfo;
  }, [post, user._id]);

  useEffect(() => {
    if (Array.isArray(post?.likes)) {
      const existUserInPost = post.likes.find(
        (value) => value.idUser === user._id
      );
      if (existUserInPost) setLiked(true);
      else setLiked(false);
    }
  }, [post.likes, user._id]);

  return (
    <div className="post_container">
      <div className="d-flex align-items-center gap-3">
        {post.profilePicture ? (
          <img
            src={post.profilePicture}
            alt="profile"
            className="follower_img"
          />
        ) : (
          <img src={ProfileDefault} alt="profile" className="follower_img" />
        )}
        
        <Tooltip
          textTitle={post?.username}
        >
          <ChildrenTootip
            post={post}
            extraInfoUser={extraInfoUser}
          />
        </Tooltip>

        <span className="ms-auto">Edit</span>
      </div>

      {post.image && post.image?.length > 0 ? (
        <img src={post.image} alt="post" />
      ) : (
        <div className="post_detail">
          <span> {post.desc}</span>
        </div>
      )}

      <div className="post_actions">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => handleLiked(!liked)}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ fontSize: 12 }}>{likes} likes</span>

      {post.image && post.image?.length > 0 && (
        <div className="post_detail">
          <span> {post.desc}</span>
        </div>
      )}

      <hr className="m-0" />
    </div>
  )
}

const ChildrenTootip = ({ post, extraInfoUser }) => {

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-3 mb-3">
        {post.profilePicture ? (
          <img
            src={post.profilePicture}
            alt="profile"
            style={{ height: 75, width: 75 }}
            className="rounded-circle"
          />
        ) : (
          <img
            src={ProfileDefault}
            alt="profile"
            style={{ height: 75, width: 75 }}
            className="rounded-circle"
          />
        )}

        <div>
          <p className="fw-bold" style={{ fontSize: 18 }}>
            {post.firstName} {post.lastName}
          </p>
          <div className="d-flex justify-content-start gap-2 align-items-start">
            <img src={Followers} alt="followers" />

            <span style={{ fontSize: 16 }} className="d-inline-block">
              Tiene {post.followers?.length} seguidores
            </span>
          </div>
        </div>
      </div>

      <div className="d-flex">
        {extraInfoUser.isMe ? (
          <button type="button" className="button_util button_cm">
            Soy yo
          </button>
        ) : !extraInfoUser?.isFollowing ? (
          <button type="button" className="button_util button_cm">
            Seguir
          </button>
        ) : (
          <button type="button" className="button_util button_cm">
            Amigos
          </button>
        )}
      </div>
    </div>
  )
  
}

export default Post;

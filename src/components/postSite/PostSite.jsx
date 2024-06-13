import React, { useState } from "react";
import Posts from "../posts/Posts";
import PostShare from "../postShare/PostShare";
import "./postSite.css";
import { useSelector } from "react-redux";

const PostSite = () => {

  const { docs, dataPage } = useSelector(state=>state.posts.posts)
  const [page, setPage] = useState(1)

  const changePage = ()=>{
    if(dataPage.hasNextPage)
      setPage(dataPage.nextPage)
  }

  return (
    <div className="postSite_container" id="scrollableDiv">
      <PostShare setPage={setPage}/>
      <Posts 
        page={page}
        docs={docs}
        dataPage={dataPage}
        changePage={changePage}
      />
    </div>
  );
};

export default PostSite;

import React, { useEffect} from "react";
import "./posts.css";
// import { listPosts } from "../../data/postsData";
import Post from "../post/Post";
import { useGetPostsQuery} from "../../services/apiSlicePosts";
import MySkeleton from "../utils/Loader/MySkeleton";
import { getUserDataCookie } from "../../helpers/authCookies";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch} from "react-redux";
import { setDataPosts } from "../../redux/slices/postsSlice";
const Posts = ({page, docs, changePage, dataPage}) => {
  const user = getUserDataCookie()
  // const { docs, dataPage } = useSelector(state=>state.posts.posts)
  const dispatch = useDispatch()

  const { isError, isFetching, data:currentData, isLoading} = useGetPostsQuery({page, id:user._id}, {refetchOnMountOrArgChange:true })

  
  // console.log({docs, isLoading, currentData, isFetching})
  useEffect(()=>{
    if(currentData && currentData?.code === 200){
      dispatch(setDataPosts(currentData.data))
    } 

  },[currentData, dispatch])

  if (isLoading && !currentData) {
    return (
      <React.Fragment>
        <MySkeleton/>
        <MySkeleton/>
        <MySkeleton/>
      </React.Fragment>
    )
  }

  
  return (
    <div
      className={
        isFetching ? "posts_container bg-dark-subtle" : "posts_container"
      }
    >
      <InfiniteScroll
        dataLength={docs.length || 0}
        next={changePage}
        hasMore={dataPage.hasNextPage}
        loader={
          <React.Fragment>
            <MySkeleton
              height={100}
            />
            <MySkeleton
              height={100}
            />
          </React.Fragment>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Fin de los posts</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {
          !isError &&
            Array.isArray(docs) &&
            docs.map((post, i) => {
              return <Post key={i} post={post} user={user} />;
            })
        }
      </InfiniteScroll>
      
    </div>
  );
};


export default Posts;

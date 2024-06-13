import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
import LogoSearch from "../LogoSearch/LogoSearch";
import "./profileleft.css";
import { useParams } from "react-router-dom";
import { useGetUserDetailQuery } from "../../services/apiSliceUser";
import MySkeleton from "../utils/Loader/MySkeleton";
const ProfileLeft = () => {
  const { id } = useParams();
  const {
    isLoading,
    data,
    isError
  } = useGetUserDetailQuery(id)

  if(isError){
    return(
      <div class="alert alert-danger" role="alert">
        Ocurrió un error
      </div>
    )  
  }

  if(isLoading){
    return(
      <React.Fragment>
        <MySkeleton />
        <MySkeleton />
        <MySkeleton />
        <MySkeleton />
        <MySkeleton />
      </React.Fragment>
    )
  }

  return (
    <div className="profileLeft_container">
      <LogoSearch />
      {
        data && (
          <InfoCard userProfile={data}/>
        )
      }
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;

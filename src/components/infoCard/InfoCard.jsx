import React, { useEffect, useState } from "react";
import "./infocard.css";
import { BsPencilSquare } from "react-icons/bs";
import ProfileModal from "../profile/ProfileModal";
import { useSelector } from "react-redux";

const InfoCard = ({ userProfile }) => {
  const { detailProfile } = userProfile
  const [isViewModal, setIsViewModal] = useState(false)
  const user = useSelector((state) => state.auth.auth.user)

  const isMyProfile = user?._id === userProfile._id

  const listWorks = (works = []) =>
    works.map((work, i) => <span className="list-group-item" key={i}>{work}</span>);

  return (
    <div className="infoCard_container">
      <ProfileModal userProfile={userProfile} isViewModal={isViewModal}/>

      <div className="infoCard_head">
        <h4>Perfil</h4>
        {
          isMyProfile &&
          <div data-bs-target="#modalEditProfile" data-bs-toggle="modal" onClick={()=>setIsViewModal(!isViewModal)}>
            <BsPencilSquare width={"2rem"} height={"1.2rem"} fill="black" />
          </div>
        }
      </div>

      {detailProfile.relationShip && (
        <div className="infoCard_info">
          <span>
            <b>Estado </b>
          </span>
          <span>{detailProfile.relationShip}</span>
        </div>
      )}
      {detailProfile.livesIn && (
        <div className="infoCard_info">
          <span>
            <b>Vive en </b>
          </span>
          <span>{detailProfile.livesIn}</span>
        </div>
      )}
      {
        Array.isArray(detailProfile.workAt) && detailProfile.workAt.length  &&
        <div className="infoCard_info text-center">
          <span>
            <b>Trabaja en </b>
          </span>
          <ul className="list-group list-group-flush">
            {
              listWorks(detailProfile.workAt)
            }
          </ul>
          
        </div>
      }

      <button type="button" className="button_util button_logout">
        Cerrar sesión
      </button>
    </div>
  );
};

export default InfoCard;

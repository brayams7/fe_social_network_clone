import React from 'react';
import './rightsite.css'
import Home from '../../assets/img/img/home.png'
import Noti from '../../assets/img/img/noti.png'
import Comment from '../../assets/img/img/comment.png'
import {FiSettings} from 'react-icons/fi'
import TrendCard from '../trend/TrendCard';
import ShareModal from '../postShare/ShareModal';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/thunks/authThunk';
import { Link, useNavigate } from 'react-router-dom';

const nameModal = "shareModal"

const RightSite = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    return (
        <div className='rightSite_container'>

            <ShareModal nameId={nameModal}/>

            <div className="nav_icons">
                <Link to={'/home'}>
                    <img src={Home} alt="home page" />
                </Link>
                <FiSettings/>
                <img src={Noti} alt="Notifications" />
                <img src={Comment} alt="Comments" />

            </div>
            <TrendCard/>

            <button 
                type='button' 
                className='button_util button_rs'
                data-bs-target={"#"+nameModal}
                data-bs-toggle="modal"
            >
                Compartir
            </button>

            <button 
                type='button' 
                className='button_util button_rs'
                
                onClick={()=>{
                    dispatch(logout())
                    navigate("/auth")
                }}
            >
                Salir
            </button>
        </div>
    );
};

export default RightSite;
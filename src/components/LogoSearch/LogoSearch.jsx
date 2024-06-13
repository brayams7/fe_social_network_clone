import React from 'react';
import './logoSearch.css'
import logo from '../../assets/img/img/logo.png'
import { CiSearch } from "react-icons/ci";

const LogoSearch = () => {
    return (
        <div className='logo_search_container w-100'>
            <img src={logo} alt="logo" />
            <div className="logo_search">
                <input type="text" placeholder='#Buscar' />
                <div className="logo_search-icon">
                    <CiSearch/>
                </div>
            </div>
        </div>
    );
};

export default LogoSearch;
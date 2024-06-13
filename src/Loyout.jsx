import React from 'react';

import { Outlet } from 'react-router-dom';


const Layout = () => {

  // const user = useSelector(state => state.auth.auth)

  return (
    <div className='container_app'>
      <div className='blur' style={{top:'-18', right:'0'}}></div>
      <div className='blur' style={{top:'36', left:'-18rem'}}></div>
      <Outlet/>
    </div>
  )
  
};

export default Layout;
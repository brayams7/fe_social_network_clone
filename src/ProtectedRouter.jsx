import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { validateExpiredToken } from './helpers/authValidateToken';
import { setUser, setToken } from './redux/slices/authSlice';
import { getRefreshTokenCookie, getTokenCookie, getUserDataCookie } from './helpers/authCookies';
// import { setToken } from './redux/slices/authSlice';



const ProtectedRouter = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = getTokenCookie()
    const userData = getUserDataCookie()
    const validateRefreshToken = getRefreshTokenCookie()

    if (token || userData){
      const isValidRefreshToken = validateExpiredToken(validateRefreshToken);
      if (isValidRefreshToken){
        dispatch(setUser(userData))
        dispatch(setToken(token))
      }
    }
    
  }, [dispatch])

  const validateUser = ()=>{

    const token = getTokenCookie()
    const userData = getUserDataCookie()
    const validateRefreshToken = getRefreshTokenCookie()
    const isValidRefreshToken = validateExpiredToken(validateRefreshToken);

    if(!token || !userData || !isValidRefreshToken) return false
  
    return true

  }

  if(validateUser()){
    return(
      <React.Fragment>
        {/* <Header/> */}
        <div className='container_app'>
          <div className='blur' style={{top:'-18', right:'0'}}></div>
          <div className='blur' style={{top:'36', left:'-18rem'}}></div>
          <Outlet/>
        </div>
      </React.Fragment>
      
    )
  }else{
    return (
      <Navigate to={"/auth"}/>
    )
  }
};

export default ProtectedRouter;
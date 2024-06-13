import React from 'react';
import Layout from './Loyout';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import ProtectedRouter from './ProtectedRouter';
import Home from './pages/home/Home';
import ProfilePage from './pages/profile/ProfilePage';

const Routers = () => {

    return (
      <Routes>
        
        <Route element={<ProtectedRouter/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>

        <Route element={<ProtectedRouter/>}>
          <Route path='/profile/:id' element={<ProfilePage/>}/>
        </Route>
        
        <Route element={<Layout/>}>
          <Route path='/auth' element={<Auth/>}/>
        </Route>

        <Route path='*' element={<h1>Page not found</h1>}/>
      </Routes>
    );
};

export default Routers;
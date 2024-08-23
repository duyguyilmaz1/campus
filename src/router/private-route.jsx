//burası user ın login olup olmadığını, ve rollerini tanımlar. 
//role göre erişilebilir sayfa

import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children, roles}) => {

    const { isUserLogin , user} = useSelector(state=> state.auth);

    if(!isUserLogin) return <Navigate to="/login"/>
    if(!roles || !Array.isArray(roles) || !roles.includes(user.role)) <Navigate to="/unauthorized"/>

  return children;
    
}

export default PrivateRoute


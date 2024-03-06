import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Private = ({islogin}) => {
  if(!islogin) return <Navigate to={"/"}/>
  return <Outlet/>
}

export default Private
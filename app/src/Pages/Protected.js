import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const Protected = () => {

  const user = JSON.parse(localStorage.getItem("user_id"));
 
  return (
    <>
      { user ? (
        <Outlet />
      ) : (
        <Navigate to="/signin" />
      )}
{/* 
      {localStorage.getItem('role') == 'admin' ? (
         <Outlet />
      ) : (
        <Navigate to="/signin" />
      )} */}
      
    </>
  );
};

export default Protected;

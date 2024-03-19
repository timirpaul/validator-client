import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/loginSlice";

const UserLogoutCard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handelLogout =(e)=>{
        e.preventDefault()
        try {
            dispatch(logout())
            window.localStorage.removeItem("isLogin")
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
      <div className="d-flex justify-content-end">
        {/* <span className="m-1">user</span> */}
        <button className="btn btn-danger" 
        onClick={handelLogout}
        >Logout</button>
      </div>
    </>
  );
};

export default UserLogoutCard;

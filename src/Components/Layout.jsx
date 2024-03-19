import React from 'react'
// import Footer from './Footer';
// import Header from './Header';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { lightTheme } from "../utils/Color";
import Sidebar from "./Sidebar";
import validatorLogo from "../img/validator.png";

const Layout = ({children}) => {
  return (
    <div className="container mt-3">
    <div className="row ">
      <div
        className="col-md-3"
        style={{ backgroundColor: lightTheme.lightBlue }}
      >
        <Sidebar name="Landing Page" />
      </div>
      <div
        className=" col-md-9  "
        style={{ backgroundColor: lightTheme.lightyellow }}
      >
        {children}
        
      </div>
    </div>
  </div>
  );

};

export default Layout
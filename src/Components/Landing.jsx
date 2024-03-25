import React from "react";
import { lightTheme } from "../utils/Color";
import Sidebar from "./Sidebar";
import validatorLogo from "../img/validator.png";
import landing_img from "../img/landing_img.png";
import console_img from "../img/console_img.png";

const Landing = () => {
  return (
    <div className="container mt-3">
      <div className="row ">
        <div
          className="col-md-3"
          style={{ backgroundColor: lightTheme.lightBlue }}
        >
          <Sidebar name="Dashboard" />
        </div>
        <div
          className="d-flex col-md-9  text-center align-items-center justify-content-center "
          // className="row col-md-9 p-8"
          style={{ backgroundColor: lightTheme.lightyellow }}
        >
          {/* <div>
          <h1>Welcome To </h1>
          <h1>Data Validator Console </h1>
          </div> */}
          <img
            src={console_img}
            alt="landing form"
            className="img-fluid"
            style={{height: "100%",width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;

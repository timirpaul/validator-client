import React from "react";
import { Link } from "react-router-dom";
import cgLogo from "../img/cglogo.png";
import pic1 from "../img/Picture1.png";
import pic2 from "../img/Picture2.png";

const Sidebar = ({name}) => {
  return (
    <>
      <div className="row m-3">
        <img src={cgLogo} alt="logo" />
        <h3>{name}</h3>
      </div>
      <div className="row p-2">
        <div className="card mt-2  p-1 text-center btnhover">
          <Link
            to="/endpoints"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h5>Endpoints</h5>
          </Link>
        </div>
        <div className="card mt-2  p-1 text-center btnhover">
          <Link
            to="/validationTasks"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h5>Validation Task</h5>
          </Link>
        </div>
        <div className="card mt-2 p-1 text-center btnhover">
        <Link
            to="/taskhistory"
            style={{ textDecoration: "none", color: "inherit" }}
          >
          <h5>Task History</h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";
import cgLogo from "../img/cglogo.png";
import { lightTheme } from "./Color";
import { Link } from "react-router-dom";
import axios from "axios";

const Endpoints = () => {
  const URL = "http://127.0.0.1:10060";

  const [apiJsonData, setApiJsonData] = useState([]);


  const getData = async () => {
    try {
      const header = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
        const res = await axios.post(`${URL}/getSecrets`,{},{ headers: header });
        console.log(res?.data);
        setApiJsonData(res?.data);
      
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

 

  console.log(apiJsonData);



  return (
    <>
      <div
        className="container mt-3 p-2"
        style={{ backgroundColor: lightTheme.lightBlue }}
      >
        <img src={cgLogo} width="200px" alt="logo" />
        <h3>Endpoints</h3>
        <div className="row d-flex justify-content-center">
          <div className="col-md-3">
            <div className="card m-2  p-1 text-center btnhover">
              <p>Actions (Edit/save)</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card m-2  p-1 text-center btnhover">
              <p>Create</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card m-2  p-1 text-center btnhover">
              <p>Delete</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card m-2  p-1 text-center btnhover">
              <p>Cancel</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="container"
        style={{ backgroundColor: lightTheme.lightyellow }}
      >
        <div className="row">
          <div className="col-12 ">
            <div className="d-flex justify-content-center">
              <div className="col-md-10 ">
                <div className="card m-4  p-1 text-center">
                  <p>Existing Endpoints</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* json data card */}
        <div className="row">
          <div className="col-12 m-2">
            {/* <div className="d-flex justify-content-center">
              <div className="col-md-10 ">
                <div className="card m-4  p-1 text-center">
                  <p>All JSON Data</p>
                </div>
              </div>
            </div> */}

            {apiJsonData.length >= 1
              ? apiJsonData?.map((item, i) => (
                  <Link
                    to={`/endpointscard/${item.secret_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="col-md-10 jsonCard btnhover " key={i}>
                      <p> endpoint_name : {item.endpoint_name} </p>
                      <p> database_type : {item.database_type} </p>
                      <p> endpoint_type : {item.endpoint_type} </p>
                      <p>
                        <input type="checkbox" />
                      </p>
                    </div>
                  </Link>
                ))
              : "No Data Found"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Endpoints;

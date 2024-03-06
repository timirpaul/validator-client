import React, { useState, useEffect } from "react";
import { lightTheme } from "../utils/Color";
import Sidebar from "./Sidebar";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { getApiData } from "../apidata/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTask = () => {
  const navigate = useNavigate();

  const [sourceEndpoint, setSourceEndpoint] = useState([]);
  const [targetEndpoint, setTargetEndpoint] = useState([]);
  const [tableName, setTableName] = useState([]);
  const [diableBtn, setDiableBtn] = useState(true);

  const [fromData, setFromData] = useState({
    task_name: "",
    source_endpoint: "Select Source point",
    secret_id_source: "",
    target_endpoint: "Select Target point",
    secret_id_sink: "",
    table_name: "Select Table Name",
  });

  const getSourceEndpoint = async () => {
    try {
      const res = await getApiData("/getEndpoints", { ep_type: "Source" });
      setSourceEndpoint(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTargetEndpoint = async () => {
    try {
      const res = await getApiData("/getEndpoints", { ep_type: "Sink" });
      setTargetEndpoint(res?.data);
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTableName = async (sourceEndpoint) => {
    try {
      const res = await getApiData("/getSourceTabs", {
        source_ep: sourceEndpoint,
      });
      setTableName(res?.data?.tables);
      console.log(res?.data?.tables);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSourceEndpoint();
    getTargetEndpoint();
    setDiableBtn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!fromData.task_name.length) return null;
      console.log("submit");
      const res = await getApiData("/creTasks", {
        task_name: fromData?.task_name,
        secret_id_source: fromData?.secret_id_source,
        secret_id_sink: fromData?.secret_id_sink,
        table_name: fromData?.table_name,
      });
      console.log(res?.data);
      if(res?.data.ERROR) {
        toast.error(res?.data?.ERROR)
      }else{
      toast.success(res?.data?.message)
      
      setTimeout(()=>{
        navigate("/validationTasks");
        console.log("nav");
      },2000)
    }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(fromData);
  console.log(sourceEndpoint);
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
          <div
            class="container"
            style={{ backgroundColor: lightTheme.lightyellow }}
          >
            <div className="row">
              <div className="col-12 ">
                <div className="d-flex justify-content-center">
                  <div className="col-md-12 ">
                    <div className="card m-3  p-1 text-center text-upper head-col">
                      <h4>Create Validation Tasks</h4>
                    </div>
                  </div>
                </div>
                <div className="card p-3">
                  <ToastContainer/>
                  <div className="col-md-10 m-2 d-flex justify-content-center">
                    <label style={{"width":"50%" ,"padding-left": "5px"}}>Task Name : </label>
                    <input
                      type="text"
                      placeholder="Name"
                      style={{ "margin-left": "20px" }}
                      name="task_name"
                      onChange={(e) =>
                        setFromData({
                          ...fromData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-10 m-2 d-flex justify-content-center">
                    <label style={{"width":"50%"}}> Source Endpoint : </label>
                    <MDBDropdown style={{ "margin-left": "20px" }}>
                      <MDBDropdownToggle
                        tag="a"
                        className="btn btn-outline-secondary"
                      >
                        {fromData.source_endpoint}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        {sourceEndpoint?.map((item, i) => (
                          <MDBDropdownItem
                            key={i}
                            link
                            onClick={(e) => {
                              setFromData({
                                ...fromData,
                                source_endpoint: item?.endpoint_name,
                                secret_id_source: item?.secret_id,
                              });
                              getTableName(item?.endpoint_name);
                            }}
                          >
                            {item?.endpoint_name}
                          </MDBDropdownItem>
                        ))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </div>
                  <div className="col-md-10 m-2 d-flex justify-content-center">
                   <label style={{"width":"50%"}}>Target Endpoint : </label> 
                    <MDBDropdown style={{ "margin-left": "20px" }}>
                      <MDBDropdownToggle
                        tag="a"
                        className="btn btn-outline-secondary"
                      >
                        {fromData.target_endpoint}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        {targetEndpoint?.map((item, i) => (
                          <MDBDropdownItem
                            key={i}
                            link
                            onClick={(e) =>
                              setFromData({
                                ...fromData,
                                target_endpoint: item?.endpoint_name,
                                secret_id_sink: item?.secret_id,
                              })
                            }
                          >
                            {item?.endpoint_name}
                          </MDBDropdownItem>
                        ))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </div>
                  <div className="col-md-10 m-2 d-flex justify-content-center">
                   <label style={{"width":"50%"}}>Table Name : </label> 
                    <MDBDropdown style={{ "margin-left": "20px" }}>
                      <MDBDropdownToggle
                        tag="a"
                        className="btn btn-outline-secondary"
                      >
                        {fromData.table_name}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        {tableName?.map((item, i) => (
                          <MDBDropdownItem
                            key={i}
                            link
                            onClick={(e) =>
                              setFromData({ ...fromData, table_name: item })
                            }
                          >
                            {item}
                          </MDBDropdownItem>
                        ))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </div>
                  {!fromData?.task_name.length && (
                    <p className="text-danger">Please Fill All Inputs</p>
                  )}
                  <div className="col-md-10 d-flex justify-content-center">
                    <button
                      className="btn btn-primary m-3"
                      onClick={(e) => navigate("/validationTasks")}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary m-3"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;

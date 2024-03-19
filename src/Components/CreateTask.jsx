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
      // console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTargetEndpoint = async () => {
    try {
      const res = await getApiData("/getEndpoints", { ep_type: "Sink" });
      setTargetEndpoint(res?.data);
      // console.log(res?.data);
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
      // console.log(res?.data?.tables);
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
      // console.log(res?.data);
      if(res?.data.ERROR) {
        toast.error(res?.data?.ERROR)
      }else{
      toast.success(res?.data?.message)
      
      setTimeout(()=>{
        navigate("/validationTasks");
      },2000)
    }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(fromData);
  // console.log(sourceEndpoint);
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
                <div className="row m-3 p-3" style={{border: "3px solid #a2a9b1" , "border-radius": "20px"}}>
                  <ToastContainer/>
                  <div className=" m-2 d-flex justify-content-center align-items-baseline" >
                    <h6 style={{"width":"30%" ,"align-items": "baseline"}}>Task Name  </h6>
                    <input
                    style={{"width":"30%"}}
                    class="form-control"
                      type="text"
                      placeholder="Name"
                      name="task_name"
                      onChange={(e) =>
                        setFromData({
                          ...fromData,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className=" m-2 d-flex justify-content-center align-items-baseline">
                    <h6 style={{"width":"30%"}}> Source Endpoint  </h6>
                    
                    <MDBDropdown style={{"width":"30%"}}>
                      <MDBDropdownToggle
                        tag="div"
                        className="btn btn-outline-secondary"
                        style={{"width": "215px"}}
                      >
                        {fromData.source_endpoint}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        {sourceEndpoint?.map((item, i) => (
                          <MDBDropdownItem
                            key={i}
                            link
                            onClick={(e) => {
                              // e.preventDefault()
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
                  <div className=" m-2 d-flex justify-content-center align-items-baseline">
                   <h6 style={{"width":"30%"}}>Target Endpoint  </h6> 
                    <MDBDropdown style={{"width":"30%"}}>
                      <MDBDropdownToggle
                        tag="a"
                        className="btn btn-outline-secondary"
                        style={{"width": "215px"}}
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
                  <div className=" m-2 d-flex justify-content-center align-items-baseline">
                   <h6 style={{"width":"30%"}}>Table Name  </h6> 
                    <MDBDropdown style={{"width":"30%"}}>
                      <MDBDropdownToggle
                        tag="a"
                        className="btn btn-outline-secondary"
                        style={{"width": "215px"}}
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
                  {/* {!fromData?.task_name.length && (
                    <p className="text-danger">Please Fill All Inputs</p>
                  )} */}
                  <div className=" d-flex justify-content-center align-items-baseline">
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

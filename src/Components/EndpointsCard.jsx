import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { lightTheme } from "../utils/Color";
import Sidebar from "./Sidebar";
import { getApiData } from "../apidata/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EndpointsCard = () => {

  const navigate = useNavigate()

  const [apiJsonData, setApiJsonData] = useState([]);


  const [post, setPost] = useState({
    name: "",
    type: 'Select Type',
    toggleOption: "",
    input: "",
  });

  const getDbType =async ()=>{
    try {
      const res = await getApiData("/getDBtype",{"ep_type":post?.toggleOption})
      console.log(res?.data);
      if(res?.data?.ERROR) return toast.error(res?.data?.ERROR)
      setApiJsonData(res?.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getDbType()
  },[post?.toggleOption])

  const handleInputChange = (e) => {
    e.preventDefault();
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const radioOnChange = async(e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit =async()=>{
    try {
      console.log("save");
      // console.log(JSON.parse(post.input));
      const res = await getApiData("/creSecrets",{endpoint_name:post?.name ,database_type:post?.type ,endpoint_type:post?.toggleOption,
        endpoint_json:JSON.parse(post.input)
      })
      // console.log(res?.data?.ERROR);
      if(res?.data?.ERROR){
        toast.error(res?.data?.ERROR)
      }else{
      toast.success(res?.data?.message)
      setTimeout(()=>{
        navigate("/endpoints")
      },2000)
    }
    } catch (error) {
      console.log(error);
    }
  }

  const handleTest =async ()=>{
    try {
      console.log("test");
      if(!post.input) return toast.error("write Endpoint Details in JSON")
      const inputJSON =JSON.parse(post.input)
      const res = await getApiData("/testConn",{ep_type:post?.toggleOption ,db_type:post?.type ,ep_json:inputJSON})
      // console.log(res?.data?.ERROR);
      toast.success(res?.data?.message)
    } catch (error) {
      // console.log(error);
      toast.success(error)
    }
  }

  // console.log(post);
  // console.log(apiJsonData);
  return (
    <div className="container mt-3">
      <div className="row ">
        <div
          className="col-md-3"
          style={{ backgroundColor: lightTheme.lightBlue }}
        >
          <Sidebar name="Endpoints" />
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
                      <h4>Create Endpoint</h4>
                    </div>
                  </div>
                </div>
                <div 
                className="row m-3 p-3" style={{border: "3px solid #a2a9b1" , borderRadius: "20px"}}
                >
                  <ToastContainer/>
                  {/* 2nd side */}
                  <div
                    className=" col-md-12"
                  >
                    <div
                      className=" mt-4 d-flex "
                    >
                      <h6 style={{"width":"30%"}}>Endpoints Type </h6>
                      <div className="d-flex justify-content-center">
                        <input
                          type="radio"
                          id="source"
                          name="toggleOption"
                          onChange={radioOnChange}
                          value="Source"
                        />
                        <label
                          style={{ color: "#D61A0C", fontWeight: "bold" ,"padding-left": "20px"}}
                        >
                          Source
                        </label>
                      </div>
                      <div className="d-flex justify-content-end" style={{"width":"30%"}}>
                        <input
                          type="radio"
                          id="target"
                          name="toggleOption"
                          onChange={radioOnChange}
                          value="Sink"
                        />
                        <label
                          style={{ color: "#D61A0C", fontWeight: "bold" ,"padding-left": "20px" }}
                        >
                          Target
                        </label>
                      </div>
                    </div>

                    <div
                      className=" mt-4 d-flex "
                    >
                      <div style={{"width": "50%" , "display": "flex" , "justify-content": "space-between"}}>
                        <h6 className="d-flex align-items-center">Endpoint Name </h6>
                        <input
                          type="text"
                          class="form-control"
                          style={{"width": "200px"}}
                          id="name"
                          name="name"
                          onChange={handleInputChange}
                          value={post.name}
                        />
                      </div>
                      <div className=" d-flex justify-content-center">
                        <h6 className="m-1"> Database Type </h6>
                        <MDBDropdown style={{ "margin-left": "20px" ,"width":"30%" }}>
                          <MDBDropdownToggle
                            tag="a"
                            className="btn btn-outline-secondary"
                            style={{"width": "150px"}}
                          >
                            {post?.type}
                          </MDBDropdownToggle>
                          <MDBDropdownMenu>
                            {apiJsonData?.map((item, i) => (
                              <MDBDropdownItem
                                key={i}
                                link
                                onClick={(e) => {
                                  setPost({ ...post, type: item?.database_type });
                                }}
                              >
                                {item?.database_type}
                              </MDBDropdownItem>
                            ))}
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </div>
                    </div>

                    <div className="mt-4 d-flex">
                    <h6 style={{"width": "22%"}}>Endpoint Details in JSON </h6>
                      <textarea
                        style={{"width": "72%" , "min-height": "166px"}}
                        type="text"
                        name="input"
                        value={post.input}
                        onChange={(e) =>
                          setPost({ ...post, [e.target.name]: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-10 mt-4 d-flex " style={{"justify-content":"space-around"}}>
                  <button className="btn btn-primary m-3" onClick={handleTest}> Test</button>
                  <button className="btn btn-primary m-3" onClick={handleSubmit} > Save</button>
                  <button className="btn btn-primary m-3" onClick={(e)=>navigate("/endpoints")}>Cancel</button>
                </div>
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

export default EndpointsCard;

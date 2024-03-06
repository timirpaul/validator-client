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

  const [apiJsonData, setApiJsonData] = useState();


  const [post, setPost] = useState({
    name: "",
    type: 'Select Type',
    toggleOption: "",
    input: "",
  });

  const getDbType =async ()=>{
    try {
      const res = await getApiData("/getDBtype",{ep_type:post?.toggleOption})
      console.log(res?.data);
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
      console.log(JSON.parse(post.input));
      const res = await getApiData("/creSecrets",{endpoint_name:post?.name ,database_type:post?.type ,endpoint_type:post?.toggleOption,
        endpoint_json:JSON.parse(post.input)
      })
      console.log(res?.data?.ERROR);
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
      console.log(res?.data?.ERROR);
      toast.success(res?.data?.message)
    } catch (error) {
      console.log(error);
      toast.success(error)
    }
  }

  console.log(post);
  console.log(apiJsonData);
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
                <div className="card p-3">
                <div className="container mt-3">
                  <ToastContainer/>
                  {/* 2nd side */}
                  <div
                    className=" col-md-12"
                    // style={{ backgroundColor: lightTheme.lightBlue }}
                  >
                    <div
                      className="container mt-1 d-flex "
                      style={{ "justify-content": "space-around" }}
                    >
                      <label className="mt-2 ">Endpoints Type </label>
                      <div>
                        <input
                          type="radio"
                          id="source"
                          name="toggleOption"
                          onChange={radioOnChange}
                          value="Source"
                        />
                        <label
                          className="m-2"
                          style={{ color: "#D61A0C", fontWeight: "bold" }}
                        >
                          Source
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="target"
                          name="toggleOption"
                          onChange={radioOnChange}
                          value="Sink"
                        />
                        <label
                          className="m-2"
                          style={{ color: "#D61A0C", fontWeight: "bold" }}
                        >
                          Target
                        </label>
                      </div>
                    </div>

                    <div
                      className="container mt-1 d-flex "
                      style={{ "justify-content": "space-around" }}
                    >
                      <div>
                        <label className="m-2">Endpoit Name :</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          onChange={handleInputChange}
                          value={post.name}
                        />
                      </div>
                      <div className=" d-flex justify-content-center">
                        <label className="m-1"> Database Type :</label>
                        <MDBDropdown style={{ "margin-left": "20px" }}>
                          <MDBDropdownToggle
                            tag="a"
                            className="btn btn-outline-secondary"
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

                    <div className="container m-2 d-flex  justify-content-center">
                    <div className=" col-md-3">Endpoint Details in JSON :</div>
                      <textarea
                        className="m-1 p-2 col-md-8"
                        type="text"
                        name="input"
                        value={post.input}
                        onChange={(e) =>
                          setPost({ ...post, [e.target.name]: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-10 d-flex justify-content-center">
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
    </div>
  );
};

export default EndpointsCard;

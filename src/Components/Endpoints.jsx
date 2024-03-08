import React, { useState, useEffect } from "react";
import { lightTheme } from "../utils/Color";
import Sidebar from "./Sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import UserLogoutCard from "./UserLogoutCard";
import { Link } from "react-router-dom";
import { getApiData } from "../apidata/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchCard from "./SearchCard";

const Endpointss = () => {
  const [apiJsonData, setApiJsonData] = useState([]);
  const [selectEndpoint, setSelectEndpoint] = useState();
  const [btnDisable, setBtnDisable] = useState(true);

  const [search, setSearch] = useState({ pattern: "", class: "endpoint" });

  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const header = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/getSecrets`,
        data,
        { headers: header }
      );
      // console.log(res?.data);
      setApiJsonData(res?.data);

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const radioOnChange = (data) => {
    // console.log(data);
    setBtnDisable(false);
    setSelectEndpoint(data);
  };

  useEffect(() => {
    getData();
    setBtnDisable(true);
  }, []);

  const handleTest = async (e) => {
    // e.stopPropagation();
    e.preventDefault()
    try {
      console.log("test");
      const res = await getApiData("/testConn", {
        ep_type: selectEndpoint?.endpoint_type,
        db_type: selectEndpoint?.database_type,
        ep_json: selectEndpoint?.endpoint_json,
      });
      // console.log(res?.data);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(apiJsonData);
  // console.log(selectEndpoint);
  return (
    <div className="container mt-3">
      <div className="row ">
        <div
          className="col-md-3"
          style={{ backgroundColor: lightTheme.lightBlue }}
        >
          <Sidebar name="Endpoints Page" />
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
                <UserLogoutCard />
                <div className="d-flex justify-content-center">
                  <div className="col-md-12 ">
                    <div className="card m-3  p-1 text-center head-col">
                      <h4>Existing Endpoints</h4>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  {/* <ToastContainer/> */}
                  <div
                    className="col-md-10 d-flex align-items-center"
                    style={{ "justify-content": "space-between" }}
                  >
                    <div className="m-3">
                      {/* <MDBDropdown>
                        <MDBDropdownToggle tag="a" className="btn btn-primary">
                          Action
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem
                            link
                            disabled={btnDisable}
                            onClick={handleTest}
                          >
                            Test
                          </MDBDropdownItem>
                          <Link
                            to={"endpointscard"}
                            style={{ "text-decoration": "none" }}
                          >
                            <MDBDropdownItem link>Create</MDBDropdownItem>
                          </Link>

                          <MDBDropdownItem link disabled={btnDisable}>
                            Edit
                          </MDBDropdownItem>
                          <MDBDropdownItem link disabled={btnDisable}>
                            Delete
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown> */}



                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Action"
                      >
                        <Dropdown.Item disabled={btnDisable} onClick={handleTest}>Test</Dropdown.Item>
                        <Dropdown.Item>
                        <Link
                            to={"endpointscard"}
                            style={{ "text-decoration": "none" }}
                            >
                            
                          Create
                          </Link>
                          </Dropdown.Item>
                        <Dropdown.Item disabled={btnDisable}>Edit</Dropdown.Item>
                        <Dropdown.Item disabled={btnDisable}>Delete</Dropdown.Item>
                      </DropdownButton>


                    </div>
                    <SearchCard
                      search={search}
                      setSearch={setSearch}
                      setApiJsonData={setApiJsonData}
                    />
                  </div>
                </div>

                <div className="row ">
                  <table className="table p-2 table-responsive table-bordered border-dark  ">
                    <tr className=" table-active table-head">
                      <th>Select</th>
                      <th>Endpoint Name</th>
                      <th>Database Type</th>
                      <th>Endpoint Type</th>
                    </tr>
                    {!apiJsonData?.length
                      ? "No data"
                      : apiJsonData.map((item, i) => (
                          <tr key={i}>
                            <td>
                              <div>
                                <input
                                  type="radio"
                                  name="task"
                                  onChange={(e) => radioOnChange(item)}
                                  value={item}
                                />
                              </div>
                            </td>
                            <td>
                              <div>{item?.endpoint_name}</div>
                            </td>
                            <td>
                              <div>{item?.database_type}</div>
                            </td>
                            <td>
                              <div>{item?.endpoint_type}</div>
                            </td>
                          </tr>
                        ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endpointss;

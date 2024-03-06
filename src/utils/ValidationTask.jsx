import React, { useState, useEffect } from "react";
import cgLogo from "../img/cglogo.png";
import { lightTheme } from "./Color";
import axios from "axios";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

const ValidationTask = () => {
  const URL = "http://127.0.0.1:10060";

  const [apiJsonData, setApiJsonData] = useState([]);

  const getApiData = async () => {
    try {
      const res = await axios.post(
        `${URL}/getTasks`,
        {},
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res?.data);
      setApiJsonData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const editFunction = (e) => {
    e.preventDefault();
    console.log("editFunction click");
  };
  const deleteFunction = (e) => {
    e.preventDefault();
    console.log("deleteFunction click");
  };
  const createFunction = (e) => {
    e.preventDefault();
    console.log("createFunction click");
  };

  return (
    <>
      <div
        className="container mt-3 p-2"
        style={{ backgroundColor: lightTheme.lightBlue }}
      >
        <img src={cgLogo} width="200px" alt="logo" />
        <h3>Validation Task</h3>

      </div>
      <div
        class="container"
        style={{ backgroundColor: lightTheme.lightyellow }}>
        <div className="row">
          <div className="col-12 ">
            <div className="d-flex justify-content-center">
              <div className="col-md-10 ">
                <div className="card m-3  p-1 text-center">
                  <p>Existing Tasks</p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-md-10 ">
                <div className="m-3">
                  <MDBDropdown>
                    <MDBDropdownToggle tag="a" className="btn btn-primary">
                      Action
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={createFunction}>
                        Create
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={editFunction}>
                        Edit
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={deleteFunction}>
                        Delete
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </div>
                <div className="row m-3">
                  <table className="table p-2 table-responsive table-bordered border-dark text-center ">
                    <tr className=" table-active text-uppercase">
                      <th>Select</th>
                      <th>task_name</th>
                      <th>source_table</th>
                      <th>source_db</th>
                      <th>sink_db</th>
                      <th>sink_table</th>
                    </tr>
                    {apiJsonData === []
                      ? "No data"
                      : apiJsonData.map((item, i) => (
                          <tr key={i}>
                            <td>
                              <div>
                                <input type="checkbox"  value={i}/>
                              </div>
                            </td>
                            <td>
                              <div>{item?.task_name}</div>
                            </td>
                            <td>
                              <div>{item?.source_table}</div>
                            </td>
                            <td>
                              <div>{item?.source_db}</div>
                            </td>
                            <td>
                              <div>{item?.sink_db}</div>
                            </td>
                            <td>
                              <div>{item?.sink_table}</div>
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
    </>
  );
};

export default ValidationTask;

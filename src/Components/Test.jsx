import React, { useState } from 'react'
import Layout from './Layout'
import SearchCard from './SearchCard'
import UserLogoutCard from './UserLogoutCard'
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { lightTheme } from "../utils/Color";

import DropdownButton from "react-bootstrap/DropdownButton";

const Test = () => {

    const [apiJsonData, setApiJsonData] = useState([{
        endpoint_name:"nksfh",
        database_type:"dnv",
        endpoint_type:"ksndbv"
    }]);

  return (
    <Layout>
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
                  <div
                    className="col-md-10 d-flex align-items-center"
                    style={{ "justify-content": "space-between" }}
                  >
                    <div className="m-3">
                      



                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Action"
                      >
                        <Dropdown.Item >Test</Dropdown.Item>
                        <Dropdown.Item to="endpointscard">
                        <Link
                            to="endpointscard"
                            style={{ "text-decoration": "none" }}
                            >
                          Create Endpoint
                          </Link>
                          </Dropdown.Item>
                        <Dropdown.Item >Edit</Dropdown.Item>
                        <Dropdown.Item >Delete</Dropdown.Item>
                      </DropdownButton>


                    </div>
                    <SearchCard
                      
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
    </Layout>
  )
}

export default Test
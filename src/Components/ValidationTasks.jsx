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
import ValidationLog from "./ValidationLog";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import UserLogoutCard from "./UserLogoutCard";
import { getApiData } from "../apidata/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchCard from "./SearchCard";

const ValidationTasks = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const [apiJsonData, setApiJsonData] = useState([]);
  const [apiTaskLog, setApiTaskLog] = useState("");
  const [search, setSearch] = useState({ pattern: "", class: "task" });
  const [selectTask, setSelectTask] = useState({});
  const [excBtnDisable, setExcBtnDisable] = useState(true);
  // const [checked, setChecked] = useState(false);

  // console.log(selectTask);
  // console.log("search", search);

  const radioOnChange = (data) => {
    // setChecked(!checked)
    console.log(data);
    setExcBtnDisable(false);
    setSelectTask(data);
  };

  const getApiTask = async () => {
    try {
      const res = await getApiData("/getTasks", {});
      // console.log(res?.data);
      setApiJsonData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiTask();
    setExcBtnDisable(true);
  }, []);

  // console.log(loading);
  const getApiLog = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await getApiData("/execTask", {
        task: selectTask?.task_name,
      });
      // console.log(res?.data);
      setApiTaskLog(res?.data);
      toast.success("Execute Successfully");
    } catch (error) {
      // console.log(error);
    }finally{
      setLoading(false);
    }
  };

  const editFunction = async (e) => {
    e.preventDefault()
    try {
      console.log("editFunction click");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFunction = async (e) => {
    e.preventDefault()
    try {
      // console.log("deleteFunction click", selectTask?.task_id);
      const res = await getApiData("/delTasks", { id: selectTask?.task_id });
      // console.log(res?.data);
      await getApiTask();
      // console.log(apiJsonData);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(search);
      const res = await getApiData("/searchData", search);
      // console.log(res?.data);
      toast.success("search complete");
      setApiJsonData(res?.data);
    } catch (error) {
      // console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row ">
        <div
          className="col-md-3"
          style={{ backgroundColor: lightTheme.lightBlue }}
        >
          <Sidebar name="Validation Task" />
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
                    <div className="card m-3  p-1 text-center text-upper head-col">
                      <h4>Existing Tasks</h4>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <ToastContainer />
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
                            disabled={excBtnDisable}
                            onClick={getApiLog}
                          >
                            Execute
                          </MDBDropdownItem>
                          <Link
                            to="createtask"
                            style={{ "text-decoration": "none" }}
                          >
                            <MDBDropdownItem link>Create Task</MDBDropdownItem>
                          </Link>

                          <MDBDropdownItem
                            disabled={excBtnDisable}
                            link
                            onClick={deleteFunction}
                          >
                            Delete
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown> */}




                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Action"
                      >
                        <Dropdown.Item disabled={excBtnDisable} onClick={getApiLog}>Execute</Dropdown.Item>
                        <Dropdown.Item>
                        <Link
                            to={"createtask"}
                            style={{ "text-decoration": "none" }}
                            >
                            
                            Create Task
                          </Link>
                          </Dropdown.Item>
                        <Dropdown.Item disabled={excBtnDisable} onClick={deleteFunction}>Delete</Dropdown.Item>
                      </DropdownButton>


                    </div>
                    {/* <SearchCard search={search} setSearch={setSearch} setApiJsonData={setApiJsonData}/> */}
                    <form
                      className="form-inline mr-auto d-flex"
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="form-control"
                        type="text"
                        name="pattern"
                        onChange={(e) => {
                          setSearch({
                            ...search,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-primary btn-mdb-color btn-rounded btn-sm my-0 m-2"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
                {loading && <Loading/>}

                {apiTaskLog && (
                  <ValidationLog
                    data={apiTaskLog}
                    fileName={selectTask?.task_name}
                    setApiTaskLog={setApiTaskLog}
                  />
                )}
                <div className="row ">
                  <table className="table p-2 table-responsive table-bordered border-dark  ">
                    <tr className=" table-active table-head text-center">
                      <th>Select</th>
                      <th>Task Name</th>
                      <th>Source Table</th>
                      <th>Source DB</th>
                      <th>Sink DB</th>
                      <th>Sink Table</th>
                    </tr>
                    {!apiJsonData?.length
                      ? "No Data Found"
                      : apiJsonData?.map((item, i) => (
                          <tr key={i}>
                            <td>
                              <div>
                                <input
                                  type="radio"
                                  name="task"
                                  onChange={(e) => radioOnChange(item)}
                                  // value={item?.task_name}
                                  value={item}
                                  // checked={checked}
                                />
                              </div>
                            </td>
                            <td>
                              <div >{item?.task_name}</div>
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
    </div>
  );
};

export default ValidationTasks;

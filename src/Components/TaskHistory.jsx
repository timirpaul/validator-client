import React, { useState, useEffect } from "react";
import { lightTheme } from "../utils/Color";
import Sidebar from "./Sidebar";
import { getApiData } from "../apidata/api";
import UserLogoutCard from "./UserLogoutCard";
import SearchCard from "./SearchCard";
import { Clock, Download } from 'react-feather';

const TaskHistory = () => {
  const [data, setData] = useState({});
  const [apiJsonData, setApiJsonData] = useState([]);
  const [search, setSearch] = useState({pattern:'' , class:'hist'});


  const getTaskHistory = async()=>{
    const res = await getApiData("/getHists",data)
    // console.log(res?.data);
    setApiJsonData(res?.data);
  }


  useEffect(() => {
    getTaskHistory()
  }, []);

  const downloadtxtfile = (data) => {
    try {
      console.log("click");
      const url = window.URL.createObjectURL(new Blob(["status : ",data?.task_status,"\nlogstream : ",  data?.task_logstream]));
      let a = document.createElement("a");
      a.href = url;
      a.download = data ? `${data?.task_name}.txt` : "tasklog.txt";
      a.click();
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(apiJsonData);
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
              <UserLogoutCard/>
                <div className="d-flex justify-content-center">
                  <div className="col-md-12 ">
                    <div className="card m-3  p-1 text-center head-col">
                      <h4> Tasks History</h4>
                    </div>
                  </div>
                </div>
                  <div className="col-md-12 d-flex align-items-center" style={{ "justify-content": "end" }}>
                    <SearchCard search={search} setSearch={setSearch} setApiJsonData={setApiJsonData}/>
                    </div>

                <div className="row mt-3">
                  <table className="table p-2 table-responsive table-bordered border-dark text-center ">
                    <tr className=" table-active table-head">
                      <th>Task Name</th>
                      <th>Status</th>
                      <th>Exe End Time</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                    {!apiJsonData?.length
                      ? "No data"
                      : apiJsonData?.map((item, i) => (
                          <tr key={i}>
                            
                            <td>
                              <div className="hide_scroll">{item?.task_name}</div>
                            </td>
                            <td>
                              <div>{item?.task_status}</div>
                            </td>
                            <td>
                              <div>{(item?.task_end)?.substring(0,19)?.replace("T"," ")}</div>
                            </td>
                            <td>
                              <div>{item?.task_message}</div>
                            </td>
                            <td>
                              <div style={{"width":"5rem"}}>
                                {item?.task_status === "Running" ? <Clock/> :
                                <div onClick={(e)=>downloadtxtfile(item)}><Download size="30px"  /></div>
                                // <button onClick={(e)=>downloadtxtfile(item)}><DownloadCloud  /> </button>
                                }
                              </div>
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

export default TaskHistory;

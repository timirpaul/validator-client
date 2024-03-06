import React, { useState, useEffect } from "react";
import { lightTheme } from "../utils/Color";
import Sidebar from "./Sidebar";
import axios from "axios";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ValidationTasks = () => {
  // const logdata = {
  //   logstream: [
  //     "Process Started at:2024-02-28T18:55:09.556927\n",
  //     "ENDPOINT=pgsql-local\n",
  //     "TABLE=gente_loco\n",
  //     "Db Details:\n                      current_time current_schema current_database\n0 2024-02-28 13:25:10.044289+00:00         public        validator",
  //     "Sink Table = gente_falso\n\n",
  //     "SQL Table volumetrics:\n  schema_name  table_name  table_size_bytes  row_count  avg_row_size_bytes\n0      public  gente_loco          20480000      10000                2048",
  //     "Max Parition/Bucket size for table gente_loco = 0.0025 GB, i.e. 2684354.56 Bytes",
  //     "No. of Buckets Derived to 8",
  //     "Each Bucket will have 1250 rows (approx.)",
  //     "Row Chunk (Prescribed) = 12000",
  //     "Row Chunk for Validation = 2000",
  //     "",
  //     "\nPrimary Key Details: ['id', 'skey']",
  //     "\nPartition Data Breakup:\n   bucket  count  size_mb\n0       0   1220    2.383\n1       1   1275    2.490\n2       2   1219    2.381\n3       3   1288    2.516\n4       4   1265    2.471\n5       5   1222    2.387\n6       6   1248    2.438\n7       7   1263    2.467",
  //     "\nNo. of Date columns = 16\n['col_12' 'col_14' 'col_17' 'col_18' 'col_20' 'col_21' 'col_24' 'col_29'\n 'col_38' 'col_45' 'col_56' 'col_59' 'col_72' 'col_82' 'col_86' 'col_89']",
  //     "Tables in MongoDB instance, 1",
  //     "Table [gente_falso] has 10000 rows",
  //     "\nNo. of CPU available 8\n",
  //     "",
  //     "Table Structure SAME for Source & Sink",
  //     "",
  //     "Extracted PKeys from SQL, Shape:(10000, 2)\n",
  //     "Extracted PKeys from NOSQL, Shape:(10000, 2), time taken:0:00:00.096556",
  //     "",
  //     "Source & Sink have exactly same Primary Keys and same number of Rows, 10000\n",
  //     "\n\n***** Core Validation Process *****",
  //     "##### Bucket: 0",
  //     "Dataframe|Chunk-1 with 1220 rows, Memory(MB): 0.9146194458007812",
  //     "Accumulated Frame shape: (1220, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:00:12.861949",
  //     "##### Bucket: 0, processed 1220 rows",
  //     "##### Bucket: 1",
  //     "Dataframe|Chunk-1 with 1275 rows, Memory(MB): 0.9558467864990234",
  //     "Accumulated Frame shape: (1275, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:00:24.181746",
  //     "##### Bucket: 1, processed 1275 rows",
  //     "##### Bucket: 2",
  //     "Dataframe|Chunk-1 with 1219 rows, Memory(MB): 0.8894567489624023",
  //     "Accumulated Frame shape: (1219, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:00:34.820457",
  //     "##### Bucket: 2, processed 1219 rows",
  //     "##### Bucket: 3",
  //     "Dataframe|Chunk-1 with 1288 rows, Memory(MB): 0.9311981201171875",
  //     "Accumulated Frame shape: (1288, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:00:44.084214",
  //     "##### Bucket: 3, processed 1288 rows",
  //     "##### Bucket: 4",
  //     "Dataframe|Chunk-1 with 1265 rows, Memory(MB): 0.9567956924438477",
  //     "Accumulated Frame shape: (1265, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:00:54.273671",
  //     "##### Bucket: 4, processed 1265 rows",
  //     "##### Bucket: 5",
  //     "Dataframe|Chunk-1 with 1222 rows, Memory(MB): 0.9161186218261719",
  //     "Accumulated Frame shape: (1222, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:01:03.384518",
  //     "##### Bucket: 5, processed 1222 rows",
  //     "##### Bucket: 6",
  //     "Dataframe|Chunk-1 with 1248 rows, Memory(MB): 0.9189453125",
  //     "Accumulated Frame shape: (1248, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:01:12.608726",
  //     "##### Bucket: 6, processed 1248 rows",
  //     "##### Bucket: 7",
  //     "Dataframe|Chunk-1 with 1263 rows, Memory(MB): 0.9299888610839844",
  //     "Accumulated Frame shape: (1263, 100)",
  //     "Status -> :)",
  //     "Time taken so far: 0:01:23.127547",
  //     "##### Bucket: 7, processed 1263 rows",
  //     "",
  //     "",
  //     "Source & Sink data stores are IDENTICAL",
  //     "",
  //     "Process Finished at:2024-02-28T18:56:33.538256",
  //     "",
  //     "Time Taken:0:01:23.981329",
  //   ],
  //   status: "Source & Sink data stores are IDENTICAL",
  // };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const [apiJsonData, setApiJsonData] = useState([]);
  // const [apiTaskLog, setApiTaskLog] = useState(logdata);
  const [apiTaskLog, setApiTaskLog] = useState('');
  // const [taskName, setTaskName] = useState({ task: "" });
  const [selectTask, setSelectTask] = useState();
  const [excBtnDisable, setExcBtnDisable] = useState(true);

  console.log(apiJsonData);

  console.log(selectTask);

  const radioOnChange = (data) => {
    console.log(data);
    setExcBtnDisable(false)
    // setTaskName({ ...taskName, [e.target.name]: e.target.value });
    setSelectTask(data);
  };

  const getApiTask = async () => {
    try {
      // const res = await axios.post(
      //   `${process.env.REACT_APP_API_KEY}/getTasks`,
      //   data,
      //   {
      //     maxBodyLength: Infinity,
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const res =await getApiData("/getTasks",{})
      console.log(res?.data);
      setApiJsonData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiTask();
    setExcBtnDisable(true)
  }, []);


  console.log(loading);
  const getApiLog = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true)
      // const res = await axios.post(
      //   `${process.env.REACT_APP_API_KEY}/execTask`,
      //   {task:selectTask?.task_name},
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const res= await getApiData("/execTask",{task:selectTask?.task_name})
      console.log(res?.data);
      setApiTaskLog(res?.data);
    } catch (error) {
      console.log(error);
    }
  };


  const editFunction = async(e) => {
    e.stopPropagation();
    try {
      console.log("editFunction click");
      
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFunction =async (e) => {
    e.stopPropagation();
    try {
      console.log("deleteFunction click", selectTask?.task_id);
      const res= await getApiData("/delTasks",{id:selectTask?.task_id})
      console.log(res?.data);
      await getApiTask()
      console.log(apiJsonData);
      toast.success(res?.data?.message)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3"  >
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
              <UserLogoutCard/>
                <div className="d-flex justify-content-center">
                  <div className="col-md-12 ">
                    <div className="card m-3  p-1 text-center text-upper head-col">
                      <h4>Existing Tasks</h4>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <ToastContainer/>
                  <div className="col-md-10 ">
                    <div className="m-3">
                      <MDBDropdown >
                        <MDBDropdownToggle  tag="a"  className="btn btn-primary" >
                          Action
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                          <MDBDropdownItem link disabled={excBtnDisable} onClick={getApiLog}>
                            Execute
                          </MDBDropdownItem>
                          <Link to="createtask" style={{"text-decoration":"none"}}>
                          <MDBDropdownItem  link >
                            Create Task
                          </MDBDropdownItem>
                          </Link>
                          
                          <MDBDropdownItem disabled={excBtnDisable} link onClick={deleteFunction}>
                            Delete
                          </MDBDropdownItem>
                        </MDBDropdownMenu>
                      </MDBDropdown>
                    </div>
                    </div>
                    </div>
                    {/* {loading && <Loading/>} */}
                    {apiTaskLog && (
                      <ValidationLog
                        data={apiTaskLog}
                        fileName={selectTask?.task_name}
                        setApiTaskLog={setApiTaskLog}
                      />
                    )}
                    <div className="row ">
                      <table className="table p-2 table-responsive table-bordered border-dark  ">
                        <tr className=" table-active table-head">
                          <th>Select</th>
                          <th>Task Name</th>
                          <th>Source Table</th>
                          <th>Source DB</th>
                          <th>Sink DB</th>
                          <th>Sink Table</th>
                        </tr>
                        {apiJsonData === []
                          ? "No data"
                          : apiJsonData?.map((item, i) => (
                              <tr key={i}>
                                <td>
                                  <div>
                                    <input
                                      type="radio"
                                      name="task"
                                      onChange={(e)=>radioOnChange(item)}
                                      // value={item?.task_name}
                                      value={item}
                                    />
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
    </div>
  );
};

export default ValidationTasks;

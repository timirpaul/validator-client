import { stringify } from "qs";
import React, { useState } from "react";

const ValidationLog = ({ data, fileName, setApiTaskLog }) => {


  // console.log(data);
  // console.log(fileName);

  data?.map((i) => console.log(i));

  const downloadtxtfile = (e ,taskName) => {
    e.preventDefault();
    try {
      console.log("click");
      const url = window.URL.createObjectURL(
        new Blob(["status : ", data?.status, "\nlogstream : ", data.logstream])
      );
      let a = document.createElement("a");
      a.href = url;
      a.download = fileName ? `${fileName}.txt` : "tasklog.txt";
      a.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup card mt-2  p-1">
      <div className="container mt-3">
        <div className="close">
          <button className="" onClick={() => setApiTaskLog("")}>
            X
          </button>
        </div>
        <div className="col-md-12 d-flex justify-content-center ">
          <div className="col-md-12">
            <h3>Validation Log</h3>
            {data?.map((item, i) => (
              <> 
              <div className="row m-3">
                <label>Task Name :{item?.task}</label>
                <label>Execution Status :</label>
                <input type="text" value={item?.status} />
              </div>
     
            <label className="row m-3">Execution Log :</label>
            <div
              className="row m-3 scroll p-1"
              style={{ backgroundColor: "whitesmoke" }}
            >
              {item?.details}
            </div>
            <button className="m-3" onClick={(e)=>downloadtxtfile(e,item?.task)}>
              Download
            </button>
            </>
))}
          </div>
        </div>
      </div>
                   
    </div>
  );
};

export default ValidationLog;

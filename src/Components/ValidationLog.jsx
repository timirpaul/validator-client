import { stringify } from "qs";
import React, { useState } from "react";

const ValidationLog = ({ data ,fileName ,setApiTaskLog }) => {
  console.log(data.logstream);
  console.log(fileName);

  const downloadtxtfile = (e) => {
    e.preventDefault();
    try {
      console.log("click");
      const url = window.URL.createObjectURL(new Blob(["status : ",data?.status,"\nlogstream : ",  data.logstream]));
      let a = document.createElement("a");
      a.href = url;
      a.download = fileName ? `${fileName}.txt` : "tasklog.txt";
      a.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="popup card mt-2  p-1"  > 
    <div className="container mt-3">
      <div className="close">
        <button className=""
        onClick={() => setApiTaskLog('')}
        >
          X
        </button>
      </div>
      <div className="col-md-12 d-flex justify-content-center ">
        <div className="col-md-12">
          <h3>Validation Log</h3>
          <div className="row m-3">
            <label>Execution Status :</label>
            <input type="text" value={data?.status} />
          </div>
            <label className="row m-3">Execution Log :</label>
          <div
            className="row m-3 scroll p-1"
            style={{ backgroundColor: "whitesmoke" }}
          >
            {data?.logstream}
          </div>
          <button className="m-3" onClick={downloadtxtfile}>Download</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ValidationLog;

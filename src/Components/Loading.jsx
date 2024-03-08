import React from "react";

const Loading = () => {
  return (
    <div className="popup loading d-flex align-items-center justify-content-center">
      <h3 className="text-dark"> Validating...</h3>
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Loading;

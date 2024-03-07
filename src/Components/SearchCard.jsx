import React from "react";
import { getApiData } from "../apidata/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SearchCard = ({ search, setSearch, setApiJsonData }) => {

    console.log(search);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(search);
      const res = await getApiData("/searchData", search);
      console.log(res?.data);
      setApiJsonData(res?.data);
      toast.success("search complete");

      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  return (
    <>
      <form className="form-inline mr-auto d-flex" onSubmit={handleSubmit}>
        <ToastContainer/>
        <input
          className="form-control"
          type="text"
          name="pattern"
          onChange={(e) => {
            setSearch({ ...search, [e.target.name]: e.target.value });
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
    </>
  );
};

export default SearchCard;

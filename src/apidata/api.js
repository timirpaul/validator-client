import axios from "axios";


export  const getApiData = async (path,data) => {
  // console.log("path",`${process.env.REACT_APP_API_KEY}${path}`);
  // console.log(data);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_KEY}${path}`,
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res);
    return res
  } catch (error) {
    console.log(error);
  }
};
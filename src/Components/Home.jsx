import React, { useState } from "react";
import "../App.css";
import cgLogo from "../img/cglogo.png";
import validatorLogo from "../img/validator.png";
import loginData from "../apidata/login_data.json";
import { lightTheme } from "../utils/Color";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/loginSlice";
import { getApiData } from "../apidata/api";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const islogin = useSelector((state) => state.loginChecker.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [btn, setBtn] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginApi = async (e) => {
    e.preventDefault();
    try {
      setBtn(true);
      const res = await getApiData("/getAuth", {
        username: user?.username,
        password: user?.password,
      });
      // console.log(res);
      if (res?.data?.status === 1) {
        return (
          toast.success(res?.data?.message),
          dispatch(login()),
          setInvalidLogin(false),
          window.localStorage.setItem("isLogin", true),
          setTimeout(() => {
            navigate("/landing");
          }, 1000)
        );
      }
      toast.error(res?.data?.ERROR)
      setInvalidLogin(true);
    } catch (error) {
      console.log(error);
    } finally {
      setBtn(false);
    }
  };
  // console.log(user);
  // console.log(loginData.email);
  return (
    <>
      <section className="" style={{ backgroundColor: lightTheme.lightgreen }}>
        <div className="container py-5  ">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <div className="d-flex justify-content-center mt-5">
                      <ToastContainer />
                      <img
                        src={cgLogo}
                        alt="login form"
                        className="img-fluid"
                        style={{ borderRadius: "1rem 0 0 1rem" }}
                      />
                    </div>
                    <img
                      src={validatorLogo}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={loginApi}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          />
                          <span className="h1 fw-bold mb-0">
                            <h2 className="text-bold">Data Validator Services</h2>
                          </span>
                        </div>
                        {invalidLogin && (
                          <label className="text-danger fw-bold">
                            invalid credentials
                          </label>
                        )}
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            name="username"
                            value={user?.username}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            name="password"
                            value={user?.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            disabled={btn}
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        {/* <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p
                          className="mb-5 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <a href="#!" style={{ color: "#393f81" }}>
                            Register here
                          </a>
                        </p> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

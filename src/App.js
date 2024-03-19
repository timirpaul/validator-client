import Landing from "./Components/Landing";
import "./App.css";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import EndpointsCard from "./Components/EndpointsCard";
import Endpoints from "./Components/Endpoints";
import ValidationTasks from "./Components/ValidationTasks";
import TaskHistory from "./Components/TaskHistory";
import PageNotFound from "./Components/PageNotFound";
import Home from "./Components/Home";
import CreateTask from "./Components/CreateTask";
import { useDispatch, useSelector } from "react-redux";
import Private from "./private/Private";
// import Test from "./Components/Test";
import { login } from "./reducers/loginSlice";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch()

    const windowLogin = window.localStorage.getItem("isLogin")
    // console.log(windowLogin);
    if(windowLogin) {
      dispatch(login())
      
    }

  const islogin = useSelector((state) => state.loginChecker.value);
  // console.log(islogin);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<Private islogin={islogin} />}>
            <Route exact path="/landing" element={<Landing />} />
            <Route exact path="/endpoints" element={<Endpoints />} />
            <Route exact path="endpoints/endpointscard" element={<EndpointsCard />} />
            <Route exact path="/validationTasks" element={<ValidationTasks />} />
            <Route exact path="/validationTasks/createtask" element={<CreateTask />}/>
            <Route exact path="/taskhistory" element={<TaskHistory />} />
          </Route>
            {/* <Route exact path="/test" element={<Test />} /> */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

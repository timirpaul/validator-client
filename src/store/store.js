import {configureStore} from "@reduxjs/toolkit"
import loginCheckerReducer from "../reducers/loginSlice"
import selectEndpointReducer from "../reducers/selectSlice"

const store = configureStore({
    reducer: {
        loginChecker: loginCheckerReducer,
        selectEndpoint : selectEndpointReducer
    }
});

export default store;
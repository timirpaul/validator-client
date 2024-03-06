import {configureStore} from "@reduxjs/toolkit"
import loginCheckerReducer from "../reducers/loginSlice"

const store = configureStore({
    reducer: {
        loginChecker: loginCheckerReducer
    }
});

export default store;
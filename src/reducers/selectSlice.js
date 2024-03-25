import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}
};
const selectSlice = createSlice({
  name: "selectEndpoint",
  initialState,
  reducers: {
    selectData:(state,action)=>{
        console.log(action);
        const updateValue = action.payload
        state.value = updateValue
    }
  }
});

export const {selectData} =selectSlice.actions;

export default selectSlice.reducer;

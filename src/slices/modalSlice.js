import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     open:false,
}
const ModSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      setModal(state,value){
        // console.log("the payload is ", value.payload)
        state.open = value.payload
      },
    },
  });
  export const {setModal} = ModSlice.actions;

export default ModSlice.reducer;
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filterText:''
}
const filterSlice = createSlice({
    name:"filter",
    initialState,
    reducers:{
        filterBook:(state,action)=>{
            state.filterText=action.payload.toLowerCase()
        }
    }
})
export default filterSlice.reducer;
export const  {filterBook} = filterSlice.actions; 
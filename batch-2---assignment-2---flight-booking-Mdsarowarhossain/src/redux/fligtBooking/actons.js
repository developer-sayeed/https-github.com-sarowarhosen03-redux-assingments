import { DELETE_BOOKING, NEW_BOOKING } from "./actionTypes"

export const addNewBooking =(payload)=>{
    return{
        type:NEW_BOOKING,
        payload
    }
}

export  const removeBooking =(payload)=>{

    return{
        type:DELETE_BOOKING,
       id:payload
    }
}


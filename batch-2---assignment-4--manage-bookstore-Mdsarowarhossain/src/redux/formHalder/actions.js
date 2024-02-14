import { ON_CHANGE, ON_CLEAR, ON_UPDATE } from "./actionsType";


export const onFromChange = (name,value) =>{
    return {
     type: ON_CHANGE,
     payload: {name,value},
    };
 }

 export const onClearForm = () =>{
    return {
     type: ON_CLEAR,
   
    };
 }
 export const onFromUpdate = (payload) =>{
    return {
     type: ON_UPDATE,
     payload,
   
    };
 }
import { ON_CHANGE, ON_CLEAR, ON_UPDATE } from "./actionsType";

let initialState = {
  data:{
    id:'',
    name: "",
    author: "",
    thumbnail: "",
    price: "",
    rating: 0,
    featured:false
  },
  editMode:false

};
export default function formcontroler(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      return  { ...state, 
      data:{...state.data,[action.payload.name]:action.payload.value}
      };
    case ON_UPDATE:
      return {...state,editMode:true,data:{...action.payload}};
    case ON_CLEAR:
      return  { ...state,editMode:false,data:{...initialState.data}};
    default:
      return state;
  }
}

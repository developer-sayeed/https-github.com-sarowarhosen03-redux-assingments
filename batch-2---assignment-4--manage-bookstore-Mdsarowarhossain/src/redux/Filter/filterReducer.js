import { FILTER__BOOK, SEARCH_BOOK } from "./Actiontypes";

const initialState= {
    Featured:false,
    filterText:''
}
export default function FilterReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER__BOOK:
        return {
            ...state,
            Featured: action.payload,
        };
        case SEARCH_BOOK:
        return {
            ...state,
            filterText: action.filterText,
        };
        default:
        return state;
    }
    }
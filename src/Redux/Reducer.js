import { ADD_LISTS, DELETE_LISTS, FETCH_LISTS } from "./Type";

const initialState = {
  lists: [],
  showSpinner: false,
};
const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LISTS:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case DELETE_LISTS:
      const filteredList = state.lists.filter(
        (list) => list.id !== action.payload
      );
      return {
        ...state,
        lists: filteredList,
      };
    case FETCH_LISTS:
      return {
        ...state,
        lists: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;

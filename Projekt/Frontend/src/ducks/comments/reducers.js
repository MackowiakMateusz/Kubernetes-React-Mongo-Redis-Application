import types from "./types";

export const commentReducer = (state = [], action) => {
    switch(action.type) {
        case types.COMMENT__GET_LIST: 
            return [...action.payload]
        case types.COMMENT_CREATE:
            return [...state, action.payload];
        case types.COMMENT_DELETE:
            return state.filter(element=>{return element._id!==action.payload});  
        case types.COMMENT_EDIT:
            return [...state.filter(element=>{return element._id!==action.payload._id}),action.payload];
        default:
            return state;
    }
}
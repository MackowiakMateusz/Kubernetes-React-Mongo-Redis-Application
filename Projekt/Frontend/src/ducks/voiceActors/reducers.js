import types from "./types";

export const voiceActorReducer = (state = [], action) => {
    switch(action.type) {
        case types.VOICEACTOR__GET_LIST: 
            return [...action.payload]
        case types.VOICEACTOR_CREATE:
            return [...state, action.payload]; 
        case types.VOICEACTOR_DELETE:
            return state.filter(element=>{return element._id!==action.payload});  
        case types.VOICEACTOR_EDIT:
            return [...state.filter(element=>{return element._id!==action.payload._id}),action.payload];
        default:
            return state;
    }
}
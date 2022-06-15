import types from "./types";

export const animeReducer = (state = [], action) => {
    switch(action.type) {
        case types.ANIME__GET_LIST: 
            return [...action.payload]
        case types.ANIME_CREATE:
            return [...state, action.payload];
        case types.ANIME_DELETE:
            return state.filter(element=>{return element._id!==action.payload});  
        case types.ANIME_EDIT:
            return [...state.filter(element=>{return element._id!==action.payload._id}),action.payload];
        default:
            return state;
    }
}
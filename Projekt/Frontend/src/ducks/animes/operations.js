import axios from "axios";
import * as actions from './actions';

export const getAnimeList = () => {
    return async dispatch => {
        const response = await 
            axios.get('http://localhost:5000/animes/');
        dispatch(actions.animeGetListAction(response.data));
    }
}

export const createAnime = (newAnime) => {
    return async dispatch => {
        try {
            const response = await 
            axios.post('http://localhost:5000/animes/', newAnime);
            if(response.status === 200) 
                dispatch(actions.animeCreateAction(response.data));
        } catch(ex) {

        }
    }
}
export const deleteAnime = (AnimeId) => {
    return async dispatch => {
        try {
            const response = await 
            axios.delete('http://localhost:5000/animes/'+AnimeId);
            if(response.status === 200) 
                dispatch(actions.animeDeleteAction(AnimeId));
        } catch(ex) {

        }
    }
}
export const editAnime = (AnimeId,newAnime) => {
    return async dispatch => {
        try {
            const response = await 
            axios.put('http://localhost:5000/animes/'+AnimeId,newAnime);
            if(response.status === 200) 
                dispatch(actions.animeEditAction(newAnime));
        } catch(ex) {

        }
    }
}
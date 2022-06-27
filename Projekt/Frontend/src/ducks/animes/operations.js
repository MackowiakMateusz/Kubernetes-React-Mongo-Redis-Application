import axios from "axios";
import * as actions from './actions';

export const getAnimeList = () => {
    return async dispatch => {
        const response = await 
            axios.get('/api/animes/');
        dispatch(actions.animeGetListAction(response.data));
    }
}

export const createAnime = (newAnime) => {
    return async dispatch => {
        try {
            const response = await 
            axios.post('/api/animes/', newAnime);
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
            axios.delete('/api/animes/'+AnimeId);
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
            axios.put('/api/animes/'+AnimeId,newAnime);
            if(response.status === 200) 
                dispatch(actions.animeEditAction(newAnime));
        } catch(ex) {

        }
    }
}
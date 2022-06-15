import types from './types';

export const animeGetListAction = (animes) => ({
    type: types.ANIME__GET_LIST,
    payload: animes
});
export const animeCreateAction = (newAnime) => ({
    type: types.ANIME_CREATE,
    payload: newAnime
});
export const animeDeleteAction = (AnimeId) => ({
    type: types.ANIME_DELETE,
    payload: AnimeId
});
export const animeEditAction = (AnimeId) => ({
    type: types.ANIME_EDIT,
    payload: AnimeId
});

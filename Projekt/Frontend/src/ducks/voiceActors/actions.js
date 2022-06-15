import types from './types';

export const voiceActorGetListAction = (voiceActors) => ({
    type: types.VOICEACTOR__GET_LIST,
    payload: voiceActors
});

export const voiceActorCreateAction = (newUser) => ({
    type: types.VOICEACTOR_CREATE,
    payload: newUser
});
export const voiceActorDeleteAction = (VoiceActorId) => ({
    type: types.VOICEACTOR_DELETE,
    payload: VoiceActorId
});
export const voiceActorEditAction = (VoiceActorId) => ({
    type: types.VOICEACTOR_EDIT,
    payload: VoiceActorId
});
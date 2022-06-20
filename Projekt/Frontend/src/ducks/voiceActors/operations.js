import axios from "axios";
import * as actions from './actions';

export const getVoiceActorList = () => {
    return async dispatch => {
        const response = await 
            axios.get(process.env.REACT_APP_baseAPIURL+'/voiceActors/');
        dispatch(actions.voiceActorGetListAction(response.data));
    }
}

export const createVoiceActor = (newVoiceActor) => {
    return async dispatch => {
        try {
            const response = await 
            axios.post(process.env.REACT_APP_baseAPIURL+'/voiceActors/', newVoiceActor);
            if(response.status === 200) 
                dispatch(actions.voiceActorCreateAction(response.data));
        } catch(ex) {

        }
    }
}
export const deleteVoiceActor = (VoiceActorId) => {
    return async dispatch => {
        try {
            const response = await 
            axios.delete(process.env.REACT_APP_baseAPIURL+'/voiceActors/'+VoiceActorId);
            if(response.status === 200) 
                dispatch(actions.voiceActorDeleteAction(VoiceActorId));
        } catch(ex) {

        }
    }
}
export const editVoiceActor = (VoiceActorId,newVoiceActor) => {
    return async dispatch => {
        try {
            const response = await 
            axios.put(process.env.REACT_APP_baseAPIURL+'/voiceActors/'+VoiceActorId,newVoiceActor);
            if(response.status === 200) 
                dispatch(actions.voiceActorEditAction(newVoiceActor));
        } catch(ex) {

        }
    }
}
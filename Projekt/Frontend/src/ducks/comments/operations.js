import axios from "axios";
import * as actions from './actions';

export const getCommentList = () => {
    return async dispatch => {
        const response = await 
            axios.get('/apiRedis/comments/');//http://server-redis-cluster-ip-service:5001/comments/
        dispatch(actions.commentGetListAction(response.data));
    }
}

export const createComment = (newComment) => {
    return async dispatch => {
        try {
            const response = await 
            axios.post('/apiRedis/comments/', newComment);
            if(response.status === 200) 
                dispatch(actions.commentCreateAction(response.data));
        } catch(ex) {

        }
    }
}
export const deleteComment = (CommentId) => {
    return async dispatch => {
        try {
            const response = await 
            axios.delete('/apiRedis/comments/'+CommentId);
            if(response.status === 200) 
                dispatch(actions.commentDeleteAction(CommentId));
        } catch(ex) {

        }
    }
}
export const editComment = (CommentId,newComment) => {
    return async dispatch => {
        try {
            const response = await 
            axios.put('/apiRedis/comments/'+CommentId,newComment);
            if(response.status === 200) 
                dispatch(actions.commentEditAction(newComment));
        } catch(ex) {

        }
    }
}
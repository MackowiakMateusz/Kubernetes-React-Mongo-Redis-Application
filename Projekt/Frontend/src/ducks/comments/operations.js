import axios from "axios";
import * as actions from './actions';

export const getCommentList = () => {
    return async dispatch => {
        const response = await 
            axios.get('http://localhost:5001/comments/');
        dispatch(actions.commentGetListAction(response.data));
    }
}

export const createComment = (newComment) => {
    return async dispatch => {
        try {
            const response = await 
            axios.post('http://localhost:5001/comments/', newComment);
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
            axios.delete('http://localhost:5001/comments/'+CommentId);
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
            axios.put('http://localhost:5001/comments/'+CommentId,newComment);
            if(response.status === 200) 
                dispatch(actions.commentEditAction(newComment));
        } catch(ex) {

        }
    }
}
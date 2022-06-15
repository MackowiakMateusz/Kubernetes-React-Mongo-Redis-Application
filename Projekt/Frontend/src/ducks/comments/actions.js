import types from './types';

export const commentGetListAction = (comments) => ({
    type: types.COMMENT__GET_LIST,
    payload: comments
});
export const commentCreateAction = (newComment) => ({
    type: types.COMMENT_CREATE,
    payload: newComment
});
export const commentDeleteAction = (CommentId) => ({
    type: types.COMMENT_DELETE,
    payload: CommentId
});
export const commentEditAction = (CommentId) => ({
    type: types.COMMENT_EDIT,
    payload: CommentId
});

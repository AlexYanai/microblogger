import api from '../api';
import { showCommentModal, showEditCommentModal } from './modal';

export function fetchComments(postId) {
  return dispatch => api.fetch(`/posts/${postId}/comments`)
    .then((response) => {
      dispatch({ type: 'FETCH_COMMENTS_SUCCESS', response });
    });
}

export function createComment(data, router, user, post) {
  data["user_id"] = user.id;
  data["post_id"] = post.id;
  data["author_name"] = user.username;
  data["author_email"] = user.email;

  return dispatch => api.post(`/users/${user.id}/comments`, {"comment": data})
    .then((response) => {
      dispatch({ type: 'CREATE_COMMENT_SUCCESS', response });
      dispatch(fetchComments(post.id));
      dispatch(showCommentModal());

      router.history.push(`/users/${user.id}/posts/${post.id}`);
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_COMMENT_FAILURE', error });
    });
}

export function editComment(data, router, currentComment) {
  const userId = currentComment.user_id;

  return dispatch => api.patch(`/users/${userId}/comments/${currentComment.id}`, {"comment": currentComment})
    .then((response) => {
      dispatch({ type: 'EDIT_COMMENT_SUCCESS', response });
      dispatch(fetchComments(currentComment.post_id));
      dispatch(showEditCommentModal(true));

      router.history.push(`/users/${userId}/posts/${currentComment.post_id}`);
    })
    .catch((error) => {
      dispatch({ type: 'EDIT_COMMENT_FAILURE', error });
    });
}

export function deleteComment(router, comment) {
  const userId    = comment.user_id;
  const commentId = comment.id;
  const postId    = comment.post_id;
    
  return dispatch => api.delete(`/users/${userId}/comments/${commentId}`, {"id": commentId})
    .then(() => {
      dispatch({ type: 'DELETE_COMMENT_SUCCESS' });
      dispatch(fetchComments(postId));
      router.history.push(`/users/${userId}/posts/${postId}`);
    })
}

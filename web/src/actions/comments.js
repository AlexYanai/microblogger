import api from '../api';
import { showCommentModal, showEditCommentModal } from './modal';

export function fetchComments(postId) {
  return dispatch => api.fetch(`/posts/${postId}/comments`)
    .then((response) => {
      dispatch({ type: 'FETCH_COMMENTS_SUCCESS', response });
    });
}

// export function showSearchForm(isSearchFormOpen) {
//   return (dispatch) => {
//     dispatch({ 
//       type: 'OPEN_SEARCH',
//       isSearchFormOpen: !isSearchFormOpen,
//     });
//   };
// }

// export function endOfPosts() {
//   return dispatch => dispatch({ type: 'END_OF_COMMENTS' });
// }

// export function fetchCategories() {
//   return dispatch => api.fetch(`/categories`)
//     .then((response) => {
//       dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', response });
//     });
// }

// export function fetchPost(userId, postId) {
//   return dispatch => api.fetch(`/users/${userId}/posts/${postId}`)
//     .then((response) => {
//       dispatch({ type: 'FETCH_COMMENT_SUCCESS', response });
//     });
// }

export function createComment(data, router, user, post) {
  data["user_id"] = user.id;
  data["post_id"] = post.id;
  data["author_name"] = user.username;
  data["author_email"] = user.email;

  console.log("data");
  console.log(data);
  console.log("user");
  console.log(user);

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

  return dispatch => api.patch(`/users/${userId}/comments/${userId}`, {"comment": currentComment})
    .then((response) => {
      dispatch({ type: 'EDIT_COMMENT_SUCCESS', response });
      // dispatch(fetchPost(currentComment.user_id, currentComment.id));

      router.history.push('/');
    })
    .catch((error) => {
      dispatch({ type: 'EDIT_COMMENT_FAILURE', error });
    });
}

export function deleteComment(router, userId, commentId, postId) {
  return dispatch => api.delete(`/users/${userId}/comment/${commentId}`, {"id": commentId})
    .then(() => {
      fetchComments(postId);
      router.history.push("/");
    })
}

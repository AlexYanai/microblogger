import api from '../api';

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
//   return dispatch => dispatch({ type: 'END_OF_POSTS' });
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
//       dispatch({ type: 'FETCH_POST_SUCCESS', response });
//     });
// }

// export function createPost(data, router, currentUser) {
//   data["user_id"] = currentUser.id;

//   return dispatch => api.post(`/users/${currentUser.id}/posts`, {"post": data})
//     .then((response) => {
//       dispatch({ type: 'CREATE_POST_SUCCESS', response });
//       dispatch(fetchPaginatedPosts({categories: [], page: 1, id: currentUser.id, route: 'paginated_posts'}));
//       dispatch(showModal(true));

//       router.history.push('/');
//     })
//     .catch((error) => {
//       dispatch({ type: 'CREATE_POST_FAILURE', error });
//     });
// }

// export function editPost(data, router, currentPost, is_public, single=false) {
//   return dispatch => api.patch(`/users/${currentPost.user_id}/posts/${currentPost.id}`, {"post": currentPost})
//     .then((response) => {
//       dispatch({ type: 'EDIT_POST_SUCCESS', response });
//       dispatch(showEditModal(true, response.data));

//       if (single) {
//         dispatch(fetchPost(currentPost.user_id, currentPost.id));
        
//       } else {
//         // Reload currentPosts if public or currentUserPosts otherwise.
//         const route = is_public ? 'posts' : 'paginated_posts';
//         dispatch(fetchPaginatedPosts({page: 1, id: currentPost.user_id, route: route}));
//       }

//       router.history.push('/');
//     })
//     .catch((error) => {
//       dispatch({ type: 'EDIT_POST_FAILURE', error });
//     });
// }

// export function deletePost(router, userId, postId, pagPosts = [], single=false) {
//   const origin = router.history.location.pathname;

//   return dispatch => api.delete(`/users/${userId}/posts/${postId}`, {"id": postId})
//     .then(() => {
//       if (origin.split("/").length !== 5) {
//         if (origin === '/posts') {
//           dispatch(fetchPaginatedPosts({page: 1, id: userId, route: 'posts'}));
//         } else {
//           const posts = pagPosts.filter(function(a) {
//             return a.data.id !== postId;
//           });

//           dispatch({
//             type: 'REFRESH_FILTERED_POSTS',
//             paginatedPosts: posts
//           });
//         }

//         router.history.push(origin);
//       } else {
//         router.history.push("/");
//       }
//     })
// }

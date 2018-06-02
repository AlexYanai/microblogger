import api from '../api';

export function favorite(router, post, pagPosts) {
  const params = {
    "post_id": post.id,
    "user_id": post.user_id
  };

  return dispatch => api.post(`/users/${post.user_id}/favorites/`, params)
    .then(() => {
      processFavoritesResponse(router, post, pagPosts, dispatch);
    })
}

export function unfavorite(router, post, pagPosts) {
  return dispatch => api.delete(`/users/${post.user_id}/favorites/${post.id}`)
    .then(() => {
      processFavoritesResponse(router, post, pagPosts, dispatch);
    })
}

function processFavoritesResponse(router, post, pagPosts, dispatch) {
  const origin = router.history.location.pathname;

  var paginatedPosts = pagPosts.filter(function(a) {
    if (a.data.id !== post.id) {
      return a;
    }

    a.data.is_favorite = !a.data.is_favorite;
    return a;
  });

  dispatch({ 
    type: 'FAVORITE',
    paginatedPosts: paginatedPosts
  });

  router.history.push(origin);
}
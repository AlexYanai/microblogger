import api from '../api';
import { fetchPost } from './posts';

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
  const origin  = router.history.location.pathname;
  const pathLen = origin.split("/").length

  if (pathLen !== 5) {
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
  } else {
    dispatch(fetchPost(post.user_id, post.id));
  }

  router.history.push(origin);
}
// import { fetchPaginatedCitations, fetchCategories } from './citations';
import api from '../api';

export function favorite(router, citation, pagCitations) {
  const params = {
    "citation_id": citation.id,
    "user_id": citation.user_id
  };

  return dispatch => api.post(`/users/${citation.user_id}/favorites/`, params)
    .then(() => {
      processFavoritesResponse(router, citation, pagCitations, dispatch);
    })
}

export function unfavorite(router, citation, pagCitations) {
  return dispatch => api.delete(`/users/${citation.user_id}/favorites/${citation.id}`)
    .then(() => {
      processFavoritesResponse(router, citation, pagCitations, dispatch);
    })
}

function processFavoritesResponse(router, citation, pagCitations, dispatch) {
  const origin = router.history.location.pathname;

  var paginatedCitations = pagCitations.filter(function(a) {
    if (a.data.id !== citation.id) {
      return a;
    }

    a.data.is_favorite = !a.data.is_favorite;
    return a;
  });

  dispatch({ 
    type: 'FAVORITE',
    paginatedCitations: paginatedCitations
  });

  router.history.push(origin);
}
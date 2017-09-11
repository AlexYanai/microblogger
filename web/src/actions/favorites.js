// import { fetchPaginatedCitations, fetchCategories } from './citations';
import api from '../api';

export function favorite(router, citation, pagCitations) {
  const origin = router.history.location.pathname;
  const params = {
    "citation_id": citation.id,
    "user_id": citation.user_id
  };

  return dispatch => api.post(`/users/${citation.user_id}/favorites/`, params)
    .then(() => {
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
    })
}

export function unfavorite(router, citation, pagCitations) {
  const params = {
    "citation_id": citation.id,
    "user_id": citation.user_id
  };
  const origin = router.history.location.pathname;

  return dispatch => api.delete(`/users/${citation.user_id}/favorites/${citation.id}`, params)
    .then(() => {
      console.log("pagCitations BEFORE");
      console.log(pagCitations);
      var paginatedCitations = pagCitations.filter(function(a) {
        if (a.data.id !== citation.id) {
          return a;
        }

        a.data.is_favorite = !a.data.is_favorite;
        return a;
      });

      console.log("pagCitations AFTER");
      console.log(pagCitations);
      dispatch({ 
        type: 'FAVORITE',
        paginatedCitations: paginatedCitations
      });

      router.history.push(origin);
    })
}
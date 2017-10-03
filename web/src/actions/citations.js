import api from '../api';
import { showModal, showEditModal } from './modal';

export function showSearchForm(isSearchFormOpen) {
  return (dispatch) => {
    const open = !isSearchFormOpen;

    dispatch({ 
      type: 'OPEN_SEARCH',
      isSearchFormOpen: open,
    });
  };
}

export function fetchPaginatedCitations(params, allCitations = []) {
  const userId = params.id;
  const route  = params.route;
  const cats   = params["categories"];

  return dispatch => api.fetch(`/users/${userId}/${route}`, params)
    .then((response) => {
      var cites = [];
      var pag   = {};

      if (response !== undefined) {
        cites = allCitations.concat(response.data);
        pag   = response.pagination;
      }

      dispatch({ 
        type: 'FETCH_FILTERED_CITATIONS_SUCCESS',
        allCitations: cites,
        pagination: pag,
        searchCategories: cats 
      });
    }).catch((error) => {
      console.log(error);
    });
}

export function endOfCitations() {
  return dispatch => dispatch({ type: 'END_OF_CITATIONS' });
}

export function fetchCategories() {
  return dispatch => api.fetch(`/categories`)
    .then((response) => {
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', response });
    });
}

export function fetchCitation(userId, citationId) {
  return dispatch => api.fetch(`/users/${userId}/citations/${citationId}`)
    .then((response) => {
      dispatch({ type: 'FETCH_CITATION_SUCCESS', response });
    });
}

export function createCitation(data, router, currentUser) {
  data["user_id"] = currentUser.id;

  return dispatch => api.post(`/users/${currentUser.id}/citations`, {"citation": data})
    .then((response) => {
      dispatch({ type: 'CREATE_CITATION_SUCCESS', response });
      dispatch(fetchPaginatedCitations({categories: [], page: 1, id: currentUser.id, route: 'filter_citations'}));
      dispatch(showModal(true));

      router.history.push('/');
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_CITATION_FAILURE', error });
    });
}

export function editCitation(data, router, currentCitation, is_public) {
  return dispatch => api.patch(`/users/${currentCitation.user_id}/citations/${currentCitation.id}`, {"citation": currentCitation})
    .then((response) => {
      dispatch({ type: 'EDIT_CITATION_SUCCESS', response });
      dispatch(showEditModal(true, response.data));

      // Reload currentCitations if public or currentUserCitations otherwise.
      const route = is_public ? 'citations' : 'paginated_citations';
      dispatch(fetchPaginatedCitations({page: 1, id: currentCitation.user_id, route: route}));

      router.history.push('/');
    })
    .catch((error) => {
      dispatch({ type: 'EDIT_CITATION_FAILURE', error });
    });
}

export function deleteCitation(router, userId, citationId, pagCitations = []) {
  const origin = router.history.location.pathname;

  return dispatch => api.delete(`/users/${userId}/citations/${citationId}`, {"id": citationId})
    .then(() => {
      if (origin === '/citations') {
        dispatch(fetchPaginatedCitations({page: 1, id: userId, route: 'citations'}));
      } else {
        var paginatedCitations = pagCitations.filter(function(a) {
          return a.data.id !== citationId;
        });

        dispatch({ 
          type: 'REFRESH_FILTERED_CITATIONS',
          paginatedCitations: paginatedCitations
        });
      }

      router.history.push(origin);
    })
}

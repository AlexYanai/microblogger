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

export function searchCitations(params, allCitations = []) {
  var searchCategories = params["categories"];

  return dispatch => api.fetch(`/users/${params.id}/filter_citations`, params)
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
        searchCategories: searchCategories 
      });
    }).catch((error) => {
      console.log("error");
      console.log(error);
    });
}

export function fetchPaginatedCitations(userId, params, allCitations = []) {
  return dispatch => api.fetch(`/users/${userId}/paginated_citations`, params)
    .then((response) => {
      var cites = [];
      var pag   = {};

      if (response !== undefined) {
        cites = allCitations.concat(response.data);
        pag   = response.pagination;
      }

      dispatch({ 
        type: 'FETCH_PAGINATED_CITATIONS_SUCCESS',
        allCitations: cites,
        pagination: pag 
      });
    }).catch((error) => {
      console.log("error");
      console.log(error);
    });
}

export function endOfCitations() {
  return dispatch => dispatch({ type: 'END_OF_CITATIONS' });
}

export function fetchCitations(params, allCitations = []) {
  return dispatch => api.fetch(`/public_citations`)
    .then((response) => {
      var cites = [];
      var pag   = {};

      if (response !== undefined) {
        cites = allCitations.concat(response.data);
        pag   = response.pagination;
      }

      dispatch({ 
        type: 'FETCH_PAGINATED_CITATIONS_SUCCESS',
        allCitations: cites,
        pagination: pag 
      });
    });
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

export function fetchUserCitations(userId) {
  return dispatch => api.fetch(`/users/${userId}/citations`)
    .then((response) => {
      console.log("response");
      console.log(response);
      dispatch({ type: 'FETCH_USER_CITATIONS_SUCCESS', response });
    });
}

export function createCitation(data, router, currentUser) {
  data["user_id"] = currentUser.id;

  return dispatch => api.post(`/users/${currentUser.id}/citations`, {"citation": data})
    .then((response) => {
      dispatch({ type: 'CREATE_CITATION_SUCCESS', response });
      dispatch(searchCitations({categories: [], page: 1, id: currentUser.id}));
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
      if (is_public) {
        dispatch(fetchCitations());
      } else {
        dispatch(fetchPaginatedCitations(currentCitation.user_id, {page: 1, id: currentCitation.user_id}));
      }

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
        dispatch(fetchCitations());
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

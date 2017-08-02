import api from '../api';

export function fetchCitations() {
  return dispatch => api.fetch('/citations')
    .then((response) => {
      dispatch({ type: 'FETCH_CITATIONS_SUCCESS', response });
    });
}

export function fetchUserCitations(userId) {
  return dispatch => api.fetch(`/users/${userId}/citations`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_CITATIONS_SUCCESS', response });
    });
}

export function createCitation(data, router) {
  return dispatch => api.post('/citations', data)
    .then((response) => {
      dispatch({ type: 'CREATE_CITATION_SUCCESS', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}

export function joinCitation(citationId, router) {
  return dispatch => api.post(`/citations/${citationId}/join`)
    .then((response) => {
      dispatch({ type: 'CITATION_JOINED', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
}
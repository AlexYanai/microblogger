import api from '../api';
import { hideModal } from './modal';

export function fetchCitation(userId, citationId) {
  return dispatch => api.fetch(`/users/${userId}/citations/${citationId}`)
    .then((response) => {
      dispatch({ type: 'FETCH_CITATIONS_SUCCESS', response });
    });
}

export function fetchCitations(userId) {
  return dispatch => api.fetch(`/users/${userId}/citations`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_CITATIONS_SUCCESS', response });
    });
}

export function createCitation(data, router, currentUser) {
  data["user_id"] = currentUser.id;

  return dispatch => api.post(`/users/${currentUser.id}/citations`, {"citation": data})
    .then((response) => {
      dispatch({ type: 'CREATE_CITATION_SUCCESS', response });
      dispatch(fetchCitations(response.data.id));
      dispatch(hideModal());

      router.history.push('/');
    })
    .catch((error) => {
      dispatch({ type: 'CREATE_CITATION_FAILURE', error });
    });
}

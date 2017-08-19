import api from '../api';
import { hideModal, hideEditModal } from './modal';

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

export function editCitation(data, router, currentCitation) {
  console.log("editCitation Before");
  return dispatch => api.patch(`/users/${currentCitation.user_id}/citations/${currentCitation.id}`, {"citation": currentCitation})
    .then((response) => {
      dispatch({ type: 'EDIT_CITATION_SUCCESS', response });
      dispatch(hideEditModal());
      dispatch(fetchCitations(response.data.id));

      router.history.push('/');
    })
    .catch((error) => {
      dispatch({ type: 'EDIT_CITATION_FAILURE', error });
    });
}

export function deleteCitation(router, currentUser, citationId) {
  return dispatch => api.delete(`/users/${currentUser}/citations/${citationId}`, {"id": citationId})
    .then(() => {
      dispatch(fetchCitations(currentUser));
      router.history.push('/');
    })
}

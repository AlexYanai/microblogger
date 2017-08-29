import api from '../api';
import { showModal, showEditModal } from './modal';

export function fetchCitations() {
  return dispatch => api.fetch(`/citations`)
    .then((response) => {
      dispatch({ type: 'FETCH_CITATIONS_SUCCESS', response });
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
  console.log("data");
  console.log(data);

  return dispatch => api.post(`/users/${currentUser.id}/citations`, {"citation": data})
    .then((response) => {
      dispatch({ type: 'CREATE_CITATION_SUCCESS', response });
      dispatch(fetchUserCitations(response.data.id));
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
        dispatch(fetchUserCitations(response.data.id));
      }

      router.history.push('/');
    })
    .catch((error) => {
      dispatch({ type: 'EDIT_CITATION_FAILURE', error });
    });
}

export function deleteCitation(router, currentUser, citationId) {
  const origin = router.history.location.pathname;

  return dispatch => api.delete(`/users/${currentUser}/citations/${citationId}`, {"id": citationId})
    .then(() => {
      if (origin === '/citations') {
        dispatch(fetchCitations());
      }

      dispatch(fetchUserCitations(currentUser));
      router.history.push(origin);
    })
}

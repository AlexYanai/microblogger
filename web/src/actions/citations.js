import api from '../api';

// export function fetchCitation() {
//   return dispatch => api.fetch('/citations')
//     .then((response) => {
//       dispatch({ type: 'FETCH_CITATIONS_SUCCESS', response });
//     });
// }

export function fetchCitations(userId) {
  return dispatch => api.fetch(`/users/${userId}/citations`)
    .then((response) => {
      dispatch({ type: 'FETCH_USER_CITATIONS_SUCCESS', response });
    });
}

// export function createCitation(data, router) {
//   return dispatch => api.post('/citations', data)
//     .then((response) => {
//       dispatch({ type: 'CREATE_CITATION_SUCCESS', response });
//       router.transitionTo(`/r/${response.data.id}`);
//     });
// }

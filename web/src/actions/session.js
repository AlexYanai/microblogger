import { reset } from 'redux-form';
import api from '../api';
import { fetchPaginatedCitations, fetchCategories } from './citations';

function setCurrentUser(dispatch, response) {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: 'AUTHENTICATION_SUCCESS', response });
  const route = currentLocation(window.location.pathname);
  dispatch(fetchPaginatedCitations({page: 1, id: response.data.id, route: route}));
  dispatch(fetchCategories());
}

function currentLocation(loc) {
  switch (loc) {
    case '/citations':
      return 'citations';
    case '/favorites':
      return 'favorites';
    default:
      return 'paginated_citations';
  }
}

export function signup(data, router) {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      router.history.push('/');
    });
}

export function login(data, router) {
  return dispatch => api.post('/sessions', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('login'));
      router.history.push('/');
    });
}

export function logout(router) {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      router.history.push('/login');
    });
}

export function authenticate() {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATION_REQUEST' });
    return api.post('/sessions/refresh')
      .then((response) => {
        setCurrentUser(dispatch, response);
      })
      .catch(() => {
        localStorage.removeItem('token');
        window.location = '/login';
      });
  };
}

export const unauthenticate = () => ({ type: 'AUTHENTICATION_FAILURE' });
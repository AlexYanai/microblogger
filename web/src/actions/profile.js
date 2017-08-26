import { authenticate } from './session';
import api from '../api';

const lodash = require("lodash");

export function showEditBioForm(router, isBioFormOpen) {
  return (dispatch) => {
    const open = !isBioFormOpen;

    dispatch({ 
      type: 'SHOW_BIO_FORM',
      isBioFormOpen: open,
    });
  };
}

export function editBio(router, currentUser, bio) {
  var clonedUser = lodash.cloneDeep(currentUser);
  clonedUser.bio = bio.bio;

  return dispatch => api.patch(`/users/${currentUser.id}`, {"user": clonedUser, "id": currentUser.id})
    .then((response) => {
      dispatch({ type: 'EDIT_BIO_SUCCESS', response });
      dispatch(authenticate());
    })
    .catch((error) => {
      dispatch({ type: 'EDIT_BIO_FAILURE', error });
    });
}
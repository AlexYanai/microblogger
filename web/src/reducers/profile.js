const initialState = {
  isBioFormOpen: false,
  profileUser: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_BIO_FORM':
      return {
        ...state,
        isBioFormOpen: action.isBioFormOpen
      }
    case 'EDIT_BIO_SUCCESS':
      return {
        ...state,
        isBioFormOpen: false,
        currentUser: action.response,
      }
    case 'EDIT_BIO_FAILURE':
      return {
        ...state,
        isBioFormOpen: false
      }
    case 'FETCH_PROFILE_SUCCESS':
      return {
        ...state,
        profileUser: action.response,
      }
    default:
      return state
  }
}

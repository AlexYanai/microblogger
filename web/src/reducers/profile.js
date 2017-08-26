const initialState = {
  isBioFormOpen: false,
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
    default:
      return state
  }
}

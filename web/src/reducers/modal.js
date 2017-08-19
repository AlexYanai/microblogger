const initialState = {
  isModalOpen: false,
  isEditModalOpen: false,
  editFormData: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        isModalOpen: action.isModalOpen
      }
    case 'HIDE_MODAL':
      return {
        ...state,
        isModalOpen: action.isModalOpen
      }
    case 'SHOW_EDIT_MODAL':
      return {
        ...state,
        isEditModalOpen: action.isEditModalOpen,
        initialValues: action.editFormData
      }
    case 'HIDE_EDIT_MODAL':
      return {
        ...state,
        isEditModalOpen: action.isEditModalOpen
      }
    default:
      return state
  }
}

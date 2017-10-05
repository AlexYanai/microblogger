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
        isModalOpen: action.isModalOpen,
        initialValues: action.editFormData
      }
    case 'SHOW_EDIT_MODAL':
      return {
        ...state,
        isEditModalOpen: action.isEditModalOpen,
        initialValues: action.editFormData
      }
    default:
      return state
  }
}

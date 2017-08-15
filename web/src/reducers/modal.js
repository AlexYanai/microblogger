const initialState = {
  isModalOpen: false,
  modalType: null,
  modalProps: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      console.log("IN SHOW MODAL");
      console.log(state);
      return {
        ...state,
        modalType: action.modalType,
        isModalOpen: action.isModalOpen,
        modalProps: action.modalProps
      }
    case 'HIDE_MODAL':
      console.log("IN HIDE MODAL");
      console.log(state);
      return {
        ...state,
        modalType: action.modalType,
        isModalOpen: action.isModalOpen,
        modalProps: action.modalProps
      }
    default:
      return state
  }
}

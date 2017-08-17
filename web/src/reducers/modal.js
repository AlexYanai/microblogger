const initialState = {
  isModalOpen: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      console.log("IN SHOW MODAL");
      console.log(state);
      return {
        ...state,
        isModalOpen: action.isModalOpen
      }
    case 'HIDE_MODAL':
      console.log("IN HIDE MODAL");
      console.log(state);
      return {
        ...state,
        isModalOpen: action.isModalOpen
      }
    default:
      return state
  }
}

export function showModal(router, modalOpen) {
  return (dispatch) => {
    const open = !modalOpen;

    dispatch({ 
      type: 'SHOW_MODAL',
      isModalOpen: open
    });
  };

}

export function hideModal() {
  return (dispatch) => {
    dispatch({ 
      type: 'HIDE_MODAL',
      isModalOpen: false
    });
  };
}

export function showModal(router, modalOpen) {
  return (dispatch) => {
    open = !modalOpen;

    dispatch({ 
      type: 'SHOW_MODAL',
      isModalOpen: open
    });
  };

}

export function hideModal() {
  return (dispatch, router) => {
    dispatch({ 
      type: 'HIDE_MODAL'
    });
  };
}

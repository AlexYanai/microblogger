export function showModal(router, modalOpen) {
  return (dispatch) => {
    open = !modalOpen;

    dispatch({ 
      type: 'SHOW_MODAL',
      isModalOpen: open
    });
    
    // console.log("ROUTER");
    // console.log(router);
    // router.history.push('/modal');
  };

}

export function hideModal() {
  return (dispatch, router) => {
    dispatch({ 
      type: 'HIDE_MODAL'
    });
  };

  // router.history.push('/');
}

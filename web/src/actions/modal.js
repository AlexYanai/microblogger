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

export function showEditModal(router, modalOpen, editFormData) {
  return (dispatch) => {
    const open = !modalOpen;
    
    if (editFormData && editFormData.categories) {
      var categories = editFormData.categories;

      if (categories) {
        editFormData.categories = categories.map(function(x) { return x.name });
      }
    }


    dispatch({ 
      type: 'SHOW_EDIT_MODAL',
      isEditModalOpen: open,
      editFormData: editFormData
    });
  };

}

export function hideEditModal() {
  return (dispatch) => {
    dispatch({ 
      type: 'HIDE_EDIT_MODAL',
      isEditModalOpen: false
    });
  };
}

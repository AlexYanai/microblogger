const lodash = require("lodash");

export function showCommentModal(modalOpen) {
  return (dispatch) => {
    const open = !modalOpen;

    dispatch({ 
      type: 'SHOW_COMMENT_MODAL',
      isCommentModalOpen: open,
      editFormData: {}
    });
  };
}

export function showEditCommentModal(modalOpen, editFormData) {
  return (dispatch) => {
    const open = !modalOpen;

    dispatch({ 
      type: 'SHOW_EDIT_COMMENT_MODAL',
      isEditCommentModalOpen: open,
      editFormData: editFormData
    });
  };
}

export function showModal(modalOpen) {
  return (dispatch) => {
    const open = !modalOpen;

    dispatch({ 
      type: 'SHOW_MODAL',
      isModalOpen: open,
      editFormData: {}
    });
  };
}

export function showEditModal(modalOpen, editFormData) {
  return (dispatch) => {
    const open        = !modalOpen;
    var newFormData = extractCategories(editFormData);

    if (!newFormData) {
      newFormData = {};
    }

    dispatch({ 
      type: 'SHOW_EDIT_MODAL',
      isEditModalOpen: open,
      editFormData: newFormData
    });
  };
}

function extractCategories(editFormData) {
  var clonedFormData = lodash.cloneDeep(editFormData);
  
  if (clonedFormData && clonedFormData.categories && !lodash.isEmpty(clonedFormData.categories)) {
    var categories = clonedFormData.categories;

    if (categories) {
      clonedFormData.categories = categories.map(function(x) { return x.name });
    }
  }

  return clonedFormData;
}

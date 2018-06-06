const initialState = {
  comments: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.response.data
      };
    case 'CREATE_COMMENT_SUCCESS':
      return {
        ...state,
        comments: action.response.data
      };
    case 'CREATE_COMMENT_FAILURE':
      return {
        ...state,
        newCommentErrors: action.error.errors,
      };
    case 'EDIT_COMMENT_SUCCESS':
      return {
        ...state,
        comments: action.response.data
      };
    case 'EDIT_COMMENT_FAILURE':
      return {
        ...state,
        newCommentErrors: action.error.errors,
      };
    case 'DELETE_COMMENT_SUCCESS':
      return {
        ...state,
      };
    default:
      return state;
  }
}
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
    default:
      return state;
  }
}
const initialState = {
  all: [],
  currentUserCitations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CITATIONS_SUCCESS':
      return {
        ...state,
        all: action.response.data,
      };
    case 'FETCH_USER_CITATIONS_SUCCESS':
      return {
        ...state,
        currentUserCitations: action.response.data,
      };
    case 'CREATE_CITATION_SUCCESS':
      return {
        ...state,
        all: [
          action.response.data,
          ...state.all,
        ],
        currentUserCitations: [
          ...state.currentUserCitations,
          action.response.data,
        ],
      };
    case 'CITATION_JOINED':
      return {
        ...state,
        currentUserCitations: [
          ...state.currentUserCitations,
          action.response.data,
        ],
      };
    default:
      return state;
  }
}
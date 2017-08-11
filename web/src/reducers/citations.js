const initialState = {
  all: [],
  currentUserCitations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CITATIONS_SUCCESS':
      return {
        ...state,
        citation: action.response.data,
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
    case 'CREATE_CITATION_FAILURE':
      return {
        ...state,
        newCitationErrors: action.error.errors,
      };
    default:
      return state;
  }
}
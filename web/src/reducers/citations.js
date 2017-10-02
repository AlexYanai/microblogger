const initialState = {
  currentUserCitations: [],
  currentCitations: [],
  favoritedCitations: [],
  paginatedCitations: [],
  reachedEnd: false,
  pagination: {
    total_pages: 0,
    total_entries: 0,
    page_size: 0,
    page_number: 0,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'OPEN_SEARCH':
      return {
        ...state,
        isSearchFormOpen: action.isSearchFormOpen,
      };
    case 'FETCH_CITATIONS_SUCCESS':
      return {
        ...state,
        currentCitations: action.response.data,
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.response.data
      };
    case 'FETCH_CITATION_SUCCESS':
      return {
        ...state,
        citation: action.response.data,
      };
    case 'FETCH_USER_CITATIONS_SUCCESS':
      return {
        ...state,
        currentUserCitations: action.response.data,
      };
    case 'FETCH_PAGINATED_CITATIONS_SUCCESS':
      return {
        ...state,
        paginatedCitations: action.allCitations,
        pagination: action.pagination,
        reachedEnd: initialState.reachedEnd
      };
    case 'FETCH_FAVORITE_CITATIONS_SUCCESS':
      return {
        ...state,
        favoritedCitations: action.allCitations,
        pagination: action.pagination,
        reachedEnd: initialState.reachedEnd
      };
    case 'FETCH_FILTERED_CITATIONS_SUCCESS':
      return {
        ...state,
        paginatedCitations: action.allCitations,
        pagination: action.pagination,
        searchCategories: action.searchCategories,
        reachedEnd: initialState.reachedEnd
      };
    case 'REFRESH_FILTERED_CITATIONS':
      return {
        ...state,
        paginatedCitations: action.paginatedCitations,
      };
    case 'CLEAR_PAGINATED_CITATIONS':
      return {
        ...state,
        paginatedCitations: []
      };
    case 'END_OF_CITATIONS':
      return {
        ...state,
        reachedEnd: true
      };
    case 'CREATE_CITATION_SUCCESS':
      return {
        ...state,
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
    case 'EDIT_CITATION_SUCCESS':
      return {
        ...state,
      };
    case 'EDIT_CITATION_FAILURE':
      return {
        ...state,
        newCitationErrors: action.error.errors,
      };
    case 'DELETE_CITATION':
      return {
        ...state
      };
    case 'FAVORITE':
      return {
        ...state,
        paginatedCitations: action.paginatedCitations,
      };
    default:
      return state;
  }
}
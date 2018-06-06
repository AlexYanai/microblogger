const initialState = {
  currentUserPosts: [],
  paginatedPosts: [],
  reachedEnd: false,
  comments: [],
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
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.response.data
      };
    case 'FETCH_POST_SUCCESS':
      return {
        ...state,
        post: action.response.data,
      };
    case 'FETCH_FILTERED_POSTS_SUCCESS':
      return {
        ...state,
        paginatedPosts: action.allPosts,
        pagination: action.pagination,
        searchCategories: action.searchCategories,
        reachedEnd: initialState.reachedEnd
      };
    case 'REFRESH_FILTERED_POSTS':
      return {
        ...state,
        paginatedPosts: action.paginatedPosts,
      };
    case 'END_OF_POSTS':
      return {
        ...state,
        reachedEnd: true
      };
    case 'CREATE_POST_SUCCESS':
      return {
        ...state,
        currentUserPosts: [
          ...state.currentUserPosts,
          action.response.data,
        ],
      };
    case 'CREATE_POST_FAILURE':
      return {
        ...state,
        newPostErrors: action.error.errors,
      };
    case 'EDIT_POST_SUCCESS':
      return {
        ...state,
      };
    case 'EDIT_POST_FAILURE':
      return {
        ...state,
        newPostErrors: action.error.errors,
      };
    case 'DELETE_POST':
      return {
        ...state
      };
    case 'FAVORITE':
      return {
        ...state,
        paginatedPosts: action.paginatedPosts,
      };
    default:
      return state;
  }
}
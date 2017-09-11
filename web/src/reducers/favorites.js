const initialState = {
  paginatedCitations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FAVORITE':
      console.log("action");
      console.log(action);
      return {
        ...state,
        paginatedCitations: action.paginatedCitations,
      };
    default:
      return state;
  }
}
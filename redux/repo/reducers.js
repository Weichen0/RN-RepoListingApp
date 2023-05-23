import {
  FETCH_REPO_DATA_SUCCESS,
  FETCH_REPO_DATA_FAILURE,
  SET_SEARCH_QUERY,
  GET_NEXT_PAGE,
  GET_REPO_REQUEST,
} from "./actions";

const initialState = {
  repoList: [],
  responseCache: {},
  page: 1,
  searchQuery: "",
  error: "",
  hasMore: true,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_REPO_DATA_SUCCESS:
      let newRepoList =
        state.page === 1
          ? action.payload.items
          : [...state.repoList, ...action.payload.items];

      return {
        ...state,
        repoList: newRepoList,
        responseCache: {
          total_count: action.payload.total_count ?? 0,
          incomplete_result: action.payload.incomplete_result ?? false,
        },
        hasMore: state?.responseCache?.total_count
          ? newRepoList?.length < state?.responseCache?.total_count
          : true,
        isFetching: false,
      };
    case FETCH_REPO_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        repoList: [],
        page: 1,
        isFetching: true,
        searchQuery: action.payload?.searchQuery,
        error: {},
      };
    case GET_NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

export default reducer;

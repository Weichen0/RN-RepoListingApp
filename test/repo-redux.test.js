import reducer from "./reducer";
import {
  FETCH_REPO_DATA_SUCCESS,
  FETCH_REPO_DATA_FAILURE,
  SET_SEARCH_QUERY,
  GET_NEXT_PAGE,
} from "./actions";

describe("repo reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      repoList: [],
      responseCache: {},
      page: 1,
      searchQuery: "",
      error: "",
      hasMore: true,
      isFetching: false,
    });
  });

  it("should handle FETCH_REPO_DATA_SUCCESS", () => {
    const initialState = {
      repoList: [],
      responseCache: {},
      page: 1,
      searchQuery: "",
      error: "",
      hasMore: true,
      isFetching: false,
    };

    const action = {
      type: FETCH_REPO_DATA_SUCCESS,
      payload: {
        items: [
          /* repo items */
        ],
        total_count: 10,
        incomplete_result: false,
      },
    };

    const expectedState = {
      ...initialState,
      repoList: action.payload.items,
      responseCache: {
        total_count: action.payload.total_count,
        incomplete_result: action.payload.incomplete_result,
      },
      isFetching: false,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_REPO_DATA_FAILURE", () => {
    const initialState = {
      repoList: [],
      responseCache: {},
      page: 1,
      searchQuery: "",
      error: "",
      hasMore: true,
      isFetching: false,
    };

    const action = {
      type: FETCH_REPO_DATA_FAILURE,
      payload: "Error message",
    };

    const expectedState = {
      ...initialState,
      error: action.payload,
      isFetching: false,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle SET_SEARCH_QUERY", () => {
    const initialState = {
      repoList: [],
      responseCache: {},
      page: 1,
      searchQuery: "",
      error: "",
      hasMore: true,
      isFetching: false,
    };

    const action = {
      type: SET_SEARCH_QUERY,
      payload: {
        searchQuery: "react native",
      },
    };

    const expectedState = {
      ...initialState,
      searchQuery: action.payload.searchQuery,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle GET_NEXT_PAGE", () => {
    const initialState = {
      repoList: [],
      responseCache: {},
      page: 1,
      searchQuery: "",
      error: "",
      hasMore: true,
      isFetching: false,
    };

    const action = {
      type: GET_NEXT_PAGE,
    };

    const expectedState = {
      ...initialState,
      page: initialState.page + 1,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});

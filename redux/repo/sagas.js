import { call, put, takeEvery, all, select } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_REPO_DATA_SUCCESS,
  FETCH_REPO_DATA_FAILURE,
  GET_REPO_REQUEST,
  GET_NEXT_PAGE,
  SET_SEARCH_QUERY,
} from "./actions";

function* fetchRepoDataSaga(action) {
  const state = yield select();
  const { page, searchQuery } = state ?? {};

  try {
    const url = `https://api.github.com/search/repositories?q=topic:react-native${
      searchQuery.length
        ? `+in:title ${encodeURIComponent(`${searchQuery}`)}+in:iname`
        : ``
    }&page=${page}`;

    const response = yield call(axios.get, url);

    yield put({
      type: FETCH_REPO_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_REPO_DATA_FAILURE,
      payload: error,
    });
  }
}

function* watchNextPageAndSearchQuery() {
  yield takeEvery([GET_NEXT_PAGE, SET_SEARCH_QUERY], fetchRepoDataSaga);
}

export function* handler() {
  yield all([
    takeEvery(GET_REPO_REQUEST, fetchRepoDataSaga),
    watchNextPageAndSearchQuery(),
  ]);
}

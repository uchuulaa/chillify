// src/sagas/songSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  setSongs,
  addSong,
  updateSong,
  deleteSong,
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSong,
  createSongSuccess,
  createSongFailure,
  editSong,
  editSongSuccess,
  editSongFailure,
  removeSong,
  removeSongSuccess,
  removeSongFailure,
} from '../slices/songSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/photos';

function* fetchSongsSaga() {
  try {
    const response = yield call(axios.get, `${API_URL}?albumId=1`);
    yield put(setSongs(response.data));
    yield put(fetchSongsSuccess());
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSongSaga(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put(addSong(response.data));
    yield put(createSongSuccess());
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}

function* editSongSaga(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put(updateSong(response.data));
    yield put(editSongSuccess());
  } catch (error) {
    yield put(editSongFailure(error.message));
  }
}

function* removeSongSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload.id}`);
    yield put(deleteSong(action.payload));
    yield put(removeSongSuccess());
  } catch (error) {
    yield put(removeSongFailure(error.message));
  }
}

function* songSaga() {
  yield takeEvery(fetchSongs.type, fetchSongsSaga);
  yield takeEvery(createSong.type, createSongSaga);
  yield takeEvery(editSong.type, editSongSaga);
  yield takeEvery(removeSong.type, removeSongSaga);
}

export default songSaga;

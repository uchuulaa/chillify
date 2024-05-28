// src/slices/songSlice.js
import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
  name: 'songs',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSongs(state, action) {
      state.list = action.payload;
    },
    addSong(state, action) {
      state.list.push(action.payload);
    },
    updateSong(state, action) {
      const index = state.list.findIndex(song => song.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteSong(state, action) {
      state.list = state.list.filter(song => song.id !== action.payload.id);
    },
    fetchSongs(state) {
      state.loading = true;
    },
    fetchSongsSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    fetchSongsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createSong(state) {
      state.loading = true;
    },
    createSongSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    createSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    editSong(state) {
      state.loading = true;
    },
    editSongSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    editSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    removeSong(state) {
      state.loading = true;
    },
    removeSongSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    removeSongFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = songSlice.actions;

export default songSlice.reducer;

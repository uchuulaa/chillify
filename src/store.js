// src/store.js
import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from './slices/songSlice';
import songSaga from './sagas/songSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(songSaga);

export default store;

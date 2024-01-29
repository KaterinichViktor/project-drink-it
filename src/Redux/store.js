import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { waterReducer } from './waterDetails/waterSlice';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  waterDetails: waterReducer,
});
export const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
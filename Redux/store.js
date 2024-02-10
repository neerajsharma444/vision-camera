import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import feedReducer from './reducers/feedSlice';
import profileReducer from './reducers/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    profile: profileReducer,
  },
});

export default store;

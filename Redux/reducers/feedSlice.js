import {createSlice} from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const {addPost} = feedSlice.actions;

export default feedSlice.reducer;

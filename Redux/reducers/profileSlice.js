import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {editProfile} = profileSlice.actions;
export default profileSlice.reducer;

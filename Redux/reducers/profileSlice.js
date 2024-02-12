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
    updateProfile: (state, action) => {
      // Update the user profile with the new data
      state.user = action.payload;
    },
  },
});

export const {editProfile, updateProfile} = profileSlice.actions;
export default profileSlice.reducer;

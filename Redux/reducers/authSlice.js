import {createSlice} from '@reduxjs/toolkit';
import {
  signUp as apiSignUp,
  logIn as apiLogIn,
  fetchUsers,
} from '../../Services/api';
import {Alert} from 'react-native';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    logoutUser: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {authenticateUser, logoutUser, setError} = authSlice.actions;

export const signUp = userData => async dispatch => {
  try {
    const user = await apiSignUp(userData);
    dispatch(authenticateUser(user));
  } catch (error) {
    dispatch(setError('Sign up failed. Please try again.'));
  }
};

export const logIn = (firstName, lastName) => async dispatch => {
  try {
    const users = await fetchUsers();

    const matchedUser = users.find(
      user => user.firstName === firstName && user.lastName === lastName,
    );

    if (matchedUser) {
      // User found, authenticate
      dispatch(authenticateUser(matchedUser));
      Alert.alert(
        'Login Successful',
        `Welcome, ${matchedUser.firstName} ${matchedUser.lastName}!`,
      );
    } else {
      throw new Error('No user found with the provided credentials');
    }
  } catch (error) {
    dispatch(setError('Login failed. Please check your credentials.'));
  }
};

export default authSlice.reducer;

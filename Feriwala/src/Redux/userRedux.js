import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    error: false,
    isFetching: false,
   
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      console.log('Login Successful:', action.payload);
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log('Login Failed');
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
      state.isFetching = false;
    },
    uploadProfilePictureStart: (state) => {
      state.isFetching = true;
    },
    uploadProfilePictureSuccess: (state, action) => {
      state.isFetching = false;
      if (state.currentUser) {
        state.currentUser.profilePicture = action.payload;
      }
      console.log('Profile Picture Uploaded:', action.payload);
    },
    uploadProfilePictureFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      console.log('Profile Picture Upload Failed');
    },
  },
  

});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  uploadProfilePictureStart,
  uploadProfilePictureSuccess,
  uploadProfilePictureFailure,
  logout
} = userSlice.actions;

export default userSlice.reducer;

import axios from 'axios';
import {
  uploadProfilePictureStart,
  uploadProfilePictureSuccess,
  uploadProfilePictureFailure,
} from './Redux/userRedux';

export const uploadProfilePicture = (file, userId) => async (dispatch) => {
  dispatch(uploadProfilePictureStart());
  const formData = new FormData();
  formData.append('profilePicture', file);
  formData.append('userId', userId);

  try {
    const response = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(uploadProfilePictureSuccess(response.data.url));
  } catch (error) {
    dispatch(uploadProfilePictureFailure());
  }
};

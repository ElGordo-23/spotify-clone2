import { Axios } from 'axios';

export const getUserProfile = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get('https://api.spotify.com/v1/me');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

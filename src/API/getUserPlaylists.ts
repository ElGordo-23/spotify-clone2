import { Axios } from 'axios';

export const getUserPlaylists = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get(
      'https://api.spotify.com/v1/me/playlists',
    );
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

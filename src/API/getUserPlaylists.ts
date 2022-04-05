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

export const getPlaylistTracks = async (
  axiosClient: Axios,
  playlistId: string | undefined,
) => {
  try {
    const response = await axiosClient.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    );

    console.log(response.data);

    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

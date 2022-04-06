import { Axios } from 'axios';
import { Tracks } from '../Pages/SinglePlaylist';
import { Playlist } from '../Pages/UserPlaylists';

export const getUserPlaylists = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get<Playlist>(
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
    const response = await axiosClient.get<Tracks>(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    );

    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

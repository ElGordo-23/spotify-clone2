import { Axios } from 'axios';

type Playlist = {
  name: string;

  images: { url: string }[];
  items: { name: string; tracks: {}; id: string }[];
  tracks: { href: string };
};

type Tracks = {
  items: {
    track: {
      name: string;
      id: string;
      uri: string;
      artists: { name: string; id: string }[];
      album: { images: { url: string }[] };
    };
  }[];
};

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

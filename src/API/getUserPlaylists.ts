import { Axios } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

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
    console.log(response.data);

    return response.data;
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

export const addTrackToPlaylist = async (
  axiosClient: Axios,
  playlistId: string | undefined,
  trackUri: string | undefined,
) => {
  try {
    const response = await axiosClient.post<Tracks>(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { data: { uris: [trackUri], position: 0 } },
    );

    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

export function useUserPlaylists() {
  const axiosClient = useAxiosClient();

  return useQuery('playlistId', () => getUserPlaylists(axiosClient));
}

export function usePlaylistTracks(playlistId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery('playlistTracks', () =>
    getPlaylistTracks(axiosClient, playlistId),
  );
}

export const useAddTrackToPlaylist = (
  playlistId: string | undefined,
  trackUri: string | undefined,
) => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      const response = axiosClient.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { data: { uris: [trackUri], position: 0 } },
      );

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('playlistTracks');
      },
    },
  );
};

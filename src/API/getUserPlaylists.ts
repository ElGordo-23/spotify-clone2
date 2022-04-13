import { Axios } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Playlist = {
  name: string;

  items: { name: string; tracks: {}; id: string; images: { url: string }[] }[];
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

  return useQuery('allUserPlaylists', () => getUserPlaylists(axiosClient));
}

export function usePlaylistTracks(playlistId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery('playlistTracks', () =>
    getPlaylistTracks(axiosClient, playlistId),
  );
}

export const useAddTrackToPlaylist = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    { playlistId: string; trackUri: string }
  >(
    ({ playlistId, trackUri }) => {
      const response = axiosClient.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: [trackUri], position: 0 },
      );

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allUserPlaylists');
      },
    },
  );
};

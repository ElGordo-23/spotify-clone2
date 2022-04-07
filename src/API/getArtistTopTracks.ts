import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Tracks = {
  tracks: {
    name: string;
    uri: string;
    duration_ms: number;
    album: {
      images: { url: string }[];
    };
  }[];
};

export const getArtistTopTracks = async (
  axiosClient: Axios,
  artistId: string | undefined,
) => {
  try {
    const response = await axiosClient.get<Tracks>(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        params: { country: 'AT' },
      },
    );
    return response.data.tracks;
  } catch (error) {
    console.log(error);
  }
};

export function useArtistTopTracks(artistId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery('topTracksKey', () =>
    getArtistTopTracks(axiosClient, artistId),
  );
}

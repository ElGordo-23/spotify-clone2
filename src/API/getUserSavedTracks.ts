import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Tracks = {
  total: number;
  items: {
    track: {
      name: string;
      uri: string;
      duration_ms: number;
      id: string;
      total: number;
      artists: { id: string; name: string }[];
      album: {
        images: { url: string }[];
      };
    };
  }[];
};

export const getUserSavedTracks = async (
  axiosClient: Axios,
  offset: number,
) => {
  try {
    const response = await axiosClient.get<Tracks>(
      'https://api.spotify.com/v1/me/tracks',
      {
        params: { limit: 50, offset: offset },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useUserSavedTracks(offset: number) {
  const axiosClient = useAxiosClient();

  return useQuery(
    ['userSavedTracks', offset],
    () => getUserSavedTracks(axiosClient, offset),
    {
      keepPreviousData: true,
    },
  );
}

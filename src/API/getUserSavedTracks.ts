import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Tracks = {
  items: {
    track: {
      name: string;
      uri: string;
      duration_ms: number;
      id: string;
      artists: { id: string; name: string }[];
      album: {
        images: { url: string }[];
      };
    };
  }[];
};

export const getUserSavedTRacks = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get<Tracks>(
      'https://api.spotify.com/v1/me/tracks',
      {
        params: { limit: 50, offset: 5 },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useUserSavedTracks() {
  const axiosClient = useAxiosClient();

  return useQuery('userSavedTracks', () => getUserSavedTRacks(axiosClient));
}

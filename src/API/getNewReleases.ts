import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Releases = {
  albums: {
    id: string;
    name: string;
    images: { url: string }[];
    artists: { id: string; name: string }[];
    items: [];
  };
};

export const getNewReleases = async (
  axiosClient: Axios,
  displayAmount: number,
) => {
  try {
    const response = await axiosClient.get<Releases>(
      'https://api.spotify.com/v1/browse/new-releases',
      {
        params: { country: 'AT', limit: displayAmount, offset: 0 },
      },
    );
    return response.data?.albums?.items || [];
  } catch (error) {
    console.log(error);
  }
};

export function useNewReleases(displayAmount: number) {
  const axiosClient = useAxiosClient();

  return useQuery('newReleases', () =>
    getNewReleases(axiosClient, displayAmount),
  );
}

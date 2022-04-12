import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Shows = {
  items: {
    show: {
      descriptioon: string;
      images: { url: string }[];
      id: string;
      name: string;
      publisher: string;
    };
  }[];
};

export const getShows = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get<Shows>(
      'https://api.spotify.com/v1/me/shows',
    );
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

export function useGetShows() {
  const axiosClient = useAxiosClient();

  return useQuery('getUserShows', () => getShows(axiosClient));
}

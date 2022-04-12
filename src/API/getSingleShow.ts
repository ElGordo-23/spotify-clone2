import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Show = {
  name: string;
  publisher: string;
  uri: string;
  description: string;
  images: { url: string }[];
  episodes: {
    items: { description: string; uri: string; images: { url: string }[] }[];
  };
};

export const getSingleShow = async (
  axiosClient: Axios,
  showId: string | undefined,
) => {
  try {
    const response = await axiosClient.get<Show>(
      `https://api.spotify.com/v1/shows/${showId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useSingleShow(showId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery('singleShow', () => getSingleShow(axiosClient, showId));
}

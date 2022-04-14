import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { SearchContent } from 'spotify-types';
import { useAxiosClient } from '../Components/AxiosClientProvider';

export const searchArtists = async (axiosClient: Axios, searchKey: string) => {
  if (searchKey) {
    try {
      const { data } = await axiosClient.get<SearchContent>(
        'https://api.spotify.com/v1/search',
        {
          params: {
            q: searchKey,
            type: 'artist',
          },
        },
      );
      return data.artists?.items;
    } catch (error) {
      console.log(error);
    }
  }
};

export function useSearch(searchKey: string) {
  const axiosClient = useAxiosClient();

  return useQuery(
    ['search', searchKey],
    () => searchArtists(axiosClient, searchKey),
    { keepPreviousData: true },
  );
}

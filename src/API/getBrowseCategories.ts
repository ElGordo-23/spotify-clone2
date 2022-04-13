import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type BrowseCategories = {
  categories: {
    items: {
      id: string;
      name: string;
      href: string;
      icons: { url: string }[];
    }[];
  };
};

export const getBrowseCategories = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get<BrowseCategories>(
      'https://api.spotify.com/v1/browse/categories',
      {
        params: { country: 'AT', offset: 0 },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useBrowseCategories() {
  const axiosClient = useAxiosClient();

  return useQuery('browseCategories', () => getBrowseCategories(axiosClient));
}

import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type CategoryPlaylists = {
  playlists: {
    items: {
      id: string;
      name: string;
      uri: string;
      images: { url: string }[];
    }[];
  };
};

export const getCategoryPlaylists = async (
  axiosClient: Axios,
  categoryId: string | undefined,
) => {
  try {
    const response = await axiosClient.get<CategoryPlaylists>(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useGetCategoryPlaylists(categoryId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery('browseCategories', () =>
    getCategoryPlaylists(axiosClient, categoryId),
  );
}

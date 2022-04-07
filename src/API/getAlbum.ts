import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Album = {
  name: string;
  artists: { id: string; name: string }[];
  images: { url: string }[];

  tracks: {
    items: { name: string; uri: string; duration_ms: number }[];
  };
};

export const getAlbum = async (
  axiosClient: Axios,
  albumId: string | undefined,
) => {
  try {
    const response = await axiosClient.get<Album>(
      `https://api.spotify.com/v1/albums/${albumId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useSingleAlbum(albumId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery('albumKey', () => getAlbum(axiosClient, albumId));
}

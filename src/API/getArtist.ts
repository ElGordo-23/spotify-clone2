import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Artist = {
  name: string;
  id: string;
  images: { url: string }[];
};

export function useArtist(artistId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery(['singleArtist', artistId], () =>
    getSingleArtist(axiosClient, artistId),
  );
}

export const getSingleArtist = async (
  axiosClient: Axios,
  artistId: string | undefined,
) => {
  try {
    const response = await axiosClient.get<Artist>(
      `https://api.spotify.com/v1/artists/${artistId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

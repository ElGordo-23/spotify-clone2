import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type AllMusic = {
  items: {
    name: string;
    album_type: string;
    id: string;
    images: { url: string }[];
  }[];
};

export const getArtistAlbums = async (
  axiosClient: Axios,
  artistId: string | undefined,
) => {
  try {
    const response = await axiosClient.get<AllMusic>(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
    );
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

export function useAllArtistMusic(artistId: string | undefined) {
  const axiosClient = useAxiosClient();

  return useQuery('allMusicKey', () => getArtistAlbums(axiosClient, artistId));
}

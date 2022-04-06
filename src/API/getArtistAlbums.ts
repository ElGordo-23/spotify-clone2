import { Axios } from 'axios';

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

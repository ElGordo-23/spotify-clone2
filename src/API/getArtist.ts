import { Axios } from 'axios';

type Artist = {
  name: string;
  id: string;
  images: { url: string }[];
};

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

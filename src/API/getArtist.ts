import { Axios } from 'axios';

export const getSingleArtist = async (
  axiosClient: Axios,
  artistId: string | undefined,
) => {
  try {
    const response = await axiosClient.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

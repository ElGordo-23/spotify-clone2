import { Axios } from 'axios';

export const getArtistAlbums = async (
  axiosClient: Axios,
  artistId: string | undefined,
) => {
  try {
    const response = await axiosClient.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
    );
    return response.data.items;
  } catch (error) {
    console.log(error);
  }
};

import { Axios } from 'axios';

export const getAlbum = async (
  axiosClient: Axios,
  albumId: string | undefined,
) => {
  try {
    const response = await axiosClient.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

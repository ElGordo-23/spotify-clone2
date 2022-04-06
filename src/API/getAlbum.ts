import { Axios } from 'axios';
import { Album } from '../Pages/SingleAlbum';

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

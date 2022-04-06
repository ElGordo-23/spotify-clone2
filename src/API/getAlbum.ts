import { Axios } from 'axios';

type Album = {
  name: string;
  artists: { id: string; name: string }[];
  images: { url: string }[];
  tracks: {
    items: { name: string; uri: string }[];
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

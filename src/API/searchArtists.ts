import { Axios } from 'axios';

type Artist = {
  id: string;
  name: string;
  images: { url: string }[] | undefined;
  artists: { id: string; name: string }[];
}[];

export const searchArtists = async (axiosClient: Axios, searchKey: string) => {
  try {
    const { data } = await axiosClient.get<Artist>(
      'https://api.spotify.com/v1/search',
      {
        params: {
          q: searchKey,
          type: 'artist',
        },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

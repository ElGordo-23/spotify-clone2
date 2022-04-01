import { Axios } from 'axios';

export const searchArtists = async (axiosClient: Axios, searchKey: string) => {
  try {
    const { data } = await axiosClient.get('https://api.spotify.com/v1/search', {

      params: {
        q: searchKey,
        type: 'artist',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
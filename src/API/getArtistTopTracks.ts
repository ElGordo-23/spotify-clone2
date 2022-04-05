import { Axios } from 'axios';

export const getArtistTopTracks = async (
  axiosClient: Axios,
  artistId: string | undefined,
) => {
  try {
    const response = await axiosClient.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        params: { country: 'AT' },
      },
    );
    return response.data.tracks;
  } catch (error) {
    console.log(error);
  }
};
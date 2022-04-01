import { Axios } from 'axios';

export const getNewReleases = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get(
      'https://api.spotify.com/v1/browse/new-releases',
      {
        params: { country: 'AT', limit: 16, offset: 0 },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

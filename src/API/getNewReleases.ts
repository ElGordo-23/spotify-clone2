import { Axios } from 'axios';

export const getNewReleases = async (
  axiosClient: Axios,
  displayAmount: number,
) => {
  try {
    const response = await axiosClient.get(
      'https://api.spotify.com/v1/browse/new-releases',
      {
        params: { country: 'AT', limit: displayAmount, offset: 0 },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

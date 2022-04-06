import { Axios } from 'axios';
import { Releases } from '../Components/NewReleases';

export const getNewReleases = async (
  axiosClient: Axios,
  displayAmount: number,
) => {
  try {
    const response = await axiosClient.get<Releases>(
      'https://api.spotify.com/v1/browse/new-releases',
      {
        params: { country: 'AT', limit: displayAmount, offset: 0 },
      },
    );
    return response.data?.albums?.items || [];
  } catch (error) {
    console.log(error);
  }
};

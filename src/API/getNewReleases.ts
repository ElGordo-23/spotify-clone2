import { Axios } from 'axios';

type Releases = {
  albums: {
    id: string;
    name: string;
    images: { url: string }[];
    artists: { id: string; name: string }[];
    items: [];
  };
};

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

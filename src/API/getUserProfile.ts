import { Axios } from 'axios';
import { useQuery } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type User = {
  display_name: string;
  id: string;
};

export const getUserProfile = async (axiosClient: Axios) => {
  try {
    const response = await axiosClient.get<User>(
      'https://api.spotify.com/v1/me',
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function useGetUser() {
  const axiosClient = useAxiosClient();

  return useQuery('getUserData', () => getUserProfile(axiosClient));
}

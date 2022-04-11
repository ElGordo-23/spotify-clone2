import { useMutation, useQueryClient } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import { useGetUser } from './getUserProfile';

export const useNewPlaylist = () => {
  const { data } = useGetUser();
  const userId = data?.id;
  const queryClient = useQueryClient();
  const axiosClient = useAxiosClient();

  return useMutation<unknown, unknown, { playlistName: string }>(
    ({ playlistName }) => {
      const response = axiosClient.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        { name: playlistName },
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allUserPlaylists');
      },
    },
  );
};

import { useMutation, useQueryClient } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

export const useDeleteSong = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, { trackId: string }>(
    ({ trackId }) => {
      const response = axiosClient.delete(
        'https://api.spotify.com/v1/me/tracks',
        {
          data: { ids: [trackId] },
        },
      );
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userSavedTracks');
      },
    },
  );
};

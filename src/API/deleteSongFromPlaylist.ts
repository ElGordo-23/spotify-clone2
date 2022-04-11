import { useMutation, useQueryClient } from 'react-query';
import { useAxiosClient } from '../Components/AxiosClientProvider';

export const useDeleteSongFromPlaylist = () => {
  const axiosClient = useAxiosClient();
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    unknown,
    { playlistId: string | undefined; trackUri: string }
  >(
    ({ playlistId, trackUri }) => {
      const response = axiosClient.delete(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { data: { tracks: [{ uri: trackUri }] } },
      );

      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('playlistTracks');
      },
    },
  );
};

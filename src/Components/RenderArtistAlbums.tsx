import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllArtistMusic } from '../API/getArtistAlbums';

type RenderPropsTypes = {
  artistId: string | undefined;
};

export function RenderArtistAlbums({ artistId }: RenderPropsTypes) {
  const { data: allMusic } = useAllArtistMusic(artistId);
  const albums = useMemo(
    () => allMusic?.filter((albums) => albums.album_type === 'album'),
    [allMusic],
  );
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 overflow-hidden hover:overflow-auto object-cover h-[200px] w-[700px] gap-4 scrollbar-hide">
      {albums?.map((album) => (
        <div key={album.id}>
          <div className="p-2 hover:bg-gray-500 rounded w-24 h-36 overflow-hidden text-center">
            <img
              src={album.images[1].url}
              alt={album.name}
              onClick={() => navigate(`/album/${album.id}`)}
              className=""
            />
            <div>
              <p className="text-white text-opacity-70">{album.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

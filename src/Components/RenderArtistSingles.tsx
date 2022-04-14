import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllArtistMusic } from '../API/getArtistAlbums';

type RenderPropsTypes = {
  artistId: string | undefined;
};

export function RenderArtistSingles({ artistId }: RenderPropsTypes) {
  const { data: allMusic } = useAllArtistMusic(artistId);

  const singles = useMemo(
    () => allMusic?.filter((albums) => albums.album_type === 'single'),
    [allMusic],
  );

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 overflow-hidden hover:overflow-auto object-cover h-[200px] w-[700px] gap-4 scrollbar-hide">
      {singles?.map((single) => (
        <div key={single.id} className="w-32 text-center h-32 ">
          <div className="p-2 hover:bg-gray-500 rounded w-20 h-36 overflow-hidden">
            <img
              src={single.images[2].url}
              alt={single.name}
              onClick={() => navigate(`/album/${single.id}`)}
              className="w-16 h-16"
            />
            <div>
              <p className="text-white text-opacity-70">{single.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

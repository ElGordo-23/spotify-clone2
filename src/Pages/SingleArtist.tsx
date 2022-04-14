import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useArtist } from '../API/getArtist';
import { RenderArtistAlbums } from '../Components/RenderArtistAlbums';
import { RenderArtistSingles } from '../Components/RenderArtistSingles';
import { RenderArtistTopTracks } from '../Components/RenderArtistTopTracks';

export function SingleArtist() {
  const { artistId } = useParams();

  const [id, setId] = useState<string | undefined>(artistId);

  const { data: artist, refetch } = useArtist(id);

  useEffect(() => {
    setId(artistId);
    refetch();
  }, [artistId, refetch]);

  return (
    <div className="relative">
      <h2 className="absolute left-4 top-48 font-extrabold text-6xl text-white ">
        {artist?.name}
      </h2>
      <img
        src={artist?.images[0].url}
        alt={artist?.name}
        className="object-cover object-center h-[264px] w-[716px]"
      />
      <div className="ml-4">
        <h3 className="font-bold text-3xl text-white ">Top Songs</h3>
        <br />
        <RenderArtistTopTracks artistId={id} />
        <br />
        <h3 className="font-bold text-3xl text-white ">Albums</h3>
        <br />
        <RenderArtistAlbums artistId={id} />
        <br />
        <h3 className="relative font-bold text-3xl text-white ">Singles</h3>
        <br />
        <RenderArtistSingles artistId={id} />
        <br />
      </div>
    </div>
  );
}

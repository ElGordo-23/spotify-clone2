import { useParams } from 'react-router-dom';
import { useArtist } from '../API/getArtist';
import { RenderArtistAlbums } from '../Components/RenderArtistAlbums';
import { RenderArtistSingles } from '../Components/RenderArtistSingles';
import { RenderArtistTopTracks } from '../Components/RenderArtistTopTracks';

export function SingleArtist() {
  const { artistId } = useParams();

  const { data: artist } = useArtist(artistId);
  return (
    <div className="relative">
      <h2 className="absolute left-4 top-48 font-extrabold text-6xl z-20 text-white ">
        {artist?.name}
      </h2>
      <img
        src={artist?.images[0].url}
        alt={artist?.name}
        className="z-10 object-cover object-center h-[264px] w-[700px]"
      />
      <h3 className="font-bold text-3xl z-20 text-white ">Top Songs</h3>
      <br />
      <RenderArtistTopTracks artistId={artistId} />
      <br />
      <h3 className="font-bold text-3xl z-20 text-white ">Albums</h3>
      <br />
      <RenderArtistAlbums artistId={artistId} />
      <br />
      <h3 className="relative font-bold text-3xl z-20 text-white ">Singles</h3>
      <br />
      <RenderArtistSingles artistId={artistId} />
      <br />
    </div>
  );
}

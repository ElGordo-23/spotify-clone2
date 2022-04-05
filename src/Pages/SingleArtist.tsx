import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleArtist } from '../API/getArtist';
import { getArtistAlbums } from '../API/getArtistAlbums';
import { getArtistTopTracks } from '../API/getArtistTopTracks';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';

type Artist = {
  name: string;
  id: string;
  images: { url: string }[];
};

type AllMusic = {
  name: string;
  album_type: string;
  id: string;
  images: { url: string }[];
};

type Tracks = {
  name: string;
  uri: string;
};

export function SingleArtist() {
  const axiosClient = useAxiosClient();

  const { artistId } = useParams();

  const [artist, setArtist] = useState<Artist>();
  const [allMusic, setAllMusic] = useState<AllMusic[]>();
  const [topTracks, setTopTracks] = useState<Tracks[]>();
  const [trackUri, setTrackUri] = useState<string>();

  const singles = allMusic?.filter((albums) => albums.album_type === 'single');
  const albums = allMusic?.filter((albums) => albums.album_type === 'album');

  useEffect(() => {
    getSingleArtist(axiosClient, artistId)
      .then((data) => setArtist(data))
      .catch((error) => console.log(error));

    getArtistAlbums(axiosClient, artistId)
      .then((data) => setAllMusic(data))
      .catch((error) => console.log(error));

    getArtistTopTracks(axiosClient, artistId)
      .then((data) => setTopTracks(data))
      .catch((error) => console.log(error));
  }, [axiosClient, artistId]);

  return (
    <div className="relative">
      <h2 className="absolute left-16 top-0 font-extrabold text-6xl z-20 text-white ">
        {artist?.name}
      </h2>
      <img
        src={artist?.images[0].url}
        alt={artist?.name}
        className="z-10 object-cover h-[264px] w-[700px]"
      />
      <h3 className="  font-bold text-3xl z-20 text-white ">Top Songs</h3>
      <ul className="z-10 object-cover h-[264px] w-[700px] text-white">
        {topTracks?.map((track) => (
          <li>
            <button onClick={() => setTrackUri(track.uri)}>{track.name}</button>
          </li>
        ))}
      </ul>
      <h3 className="font-bold text-3xl z-20 text-white ">Albums</h3>
      <div className="flex flex-row  overflow-auto  z-10 object-cover w-[700px]">
        {albums?.map((album) => (
          <img src={album.images[2].url} alt={album.name} />
        ))}
      </div>
      <h3 className="relative font-bold text-3xl z-20 text-white ">Singles</h3>
      <div className="flex flex-row overflow-auto z-10 object-cover w-[700px]">
        {singles?.map((single) => (
          <img src={single.images[2].url} alt={single.name} />
        ))}
      </div>
      <Player trackUri={trackUri} />
    </div>
  );
}

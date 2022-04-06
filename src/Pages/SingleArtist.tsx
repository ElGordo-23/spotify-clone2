import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleArtist } from '../API/getArtist';
import { getArtistAlbums } from '../API/getArtistAlbums';
import { getArtistTopTracks } from '../API/getArtistTopTracks';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Player from '../Components/Player';

export type Artist = {
  name: string;
  id: string;
  images: { url: string }[];
};

export type AllMusic = {
  items: {
    name: string;
    album_type: string;
    id: string;
    images: { url: string }[];
  }[];
};

export type Tracks = {
  tracks: {
    name: string;
    uri: string;
  }[];
};

export function SingleArtist() {
  const { artistId } = useParams();

  const axiosClient = useAxiosClient();
  const navigate = useNavigate();

  // const [artist, setArtist] = useState<Artist>();
  // const [allMusic, setAllMusic] = useState<AllMusic[]>();
  // const [topTracks, setTopTracks] = useState<Tracks[]>();
  const [trackUri, setTrackUri] = useState<string>();

  const { data: artist } = useQuery('getArtist', () =>
    getSingleArtist(axiosClient, artistId),
  );
  const { data: allMusic } = useQuery('getAllMusicFromArtist', () =>
    getArtistAlbums(axiosClient, artistId),
  );

  const { data: topTracks } = useQuery('getTopTracks', () =>
    getArtistTopTracks(axiosClient, artistId),
  );

  const singles = allMusic?.filter((albums) => albums.album_type === 'single');
  const albums = allMusic?.filter((albums) => albums.album_type === 'album');

  // useEffect(() => {
  // getSingleArtist(axiosClient, artistId)
  //   .then((data) => setArtist(data))
  //   .catch((error) => console.log(error));

  // getArtistAlbums(axiosClient, artistId)
  //   .then((data) => setAllMusic(data))
  //   .catch((error) => console.log(error));

  //   getArtistTopTracks(axiosClient, artistId)
  //     .then((data) => setTopTracks(data))
  //     .catch((error) => console.log(error));
  // }, [axiosClient, artistId]);

  return (
    <div className="relative">
      <h2 className="absolute left-4 top-48 font-extrabold text-6xl z-20 text-white ">
        {artist?.name}
      </h2>
      <img
        src={artist?.images[0].url}
        alt={artist?.name}
        className="z-10 object-cover h-[264px] w-[700px]"
      />
      <h3 className="font-bold text-3xl z-20 text-white ">Top Songs</h3>
      <ul className="z-10  text-white">
        {topTracks?.map((track) => (
          <li>
            <button onClick={() => setTrackUri(track.uri)}>{track.name}</button>
          </li>
        ))}
      </ul>
      <h3 className="font-bold text-3xl z-20 text-white ">Albums</h3>
      <div className="flex flex-row overflow-auto  z-10 object-cover w-[700px]">
        {albums?.map((album) => (
          <img
            src={album.images[2].url}
            alt={album.name}
            onClick={() => navigate(`/album/${album.id}`)}
          />
        ))}
      </div>
      <h3 className="relative font-bold text-3xl z-20 text-white ">Singles</h3>
      <div className="flex flex-row overflow-auto z-10 object-cover w-[700px]">
        {singles?.map((single) => (
          <img
            src={single.images[2].url}
            alt={single.name}
            onClick={() => navigate(`/album/${single.id}`)}
          />
        ))}
      </div>
      <br />
      <Player trackUri={trackUri} />
    </div>
  );
}

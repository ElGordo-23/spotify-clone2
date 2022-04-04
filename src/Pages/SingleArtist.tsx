import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleArtist } from '../API/getArtist';
import { useAxiosClient } from '../Components/AxiosClientProvider';

type Artist = {
  name: string;
  id: string;
  images: { url: string }[];
};

export function SingleArtist() {
  const axiosClient = useAxiosClient();

  const { artistId } = useParams();

  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    getSingleArtist(axiosClient, artistId)
      .then((data) => setArtist(data))
      .catch((error) => console.log(error));
  }, [axiosClient, artistId]);

  return (
    <div>
      {artist ? (
        <h2 className="relative left-72 top-24 font-extrabold text-6xl">
          {artist.name}
        </h2>
      ) : null}
    </div>
  );
}

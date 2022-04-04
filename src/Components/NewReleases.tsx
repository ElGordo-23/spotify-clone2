import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNewReleases } from '../API/getNewReleases';
import { useAxiosClient } from './AxiosClientProvider';

export type Release = {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { id: string; name: string }[];
};

export function NewReleases() {
  const [releases, setNewReleases] = useState<Release[]>([]);

  const [displayAmount, setDisplayAmount] = useState<number>(16);

  const axiosClient = useAxiosClient();

  const navigate = useNavigate();

  useEffect(() => {
    getNewReleases(axiosClient, displayAmount)
      .then((data) => setNewReleases(data?.albums?.items || []))
      .catch((error) => console.log(error));
  }, [axiosClient, displayAmount]);

  return (
    <div className=" grid grid-cols-4 gap-24 items-center bg-gray-700 text-white p-9">
      {releases.map((release) => (
        <div key={release.artists[0].id} className=" w-32 text-center  h-20">
          <img
            className="hover:bg-gray-300"
            src={release.images[0].url}
            alt="Release"
            onClick={() => navigate(`/artist/${release.artists[0].id}`)}
          ></img>
          <Link to={`/artist/${release.artists[0].id}`}>
            <div>
              <p>{release.artists[0].name}</p>
              <p>{release.name}</p>
            </div>
          </Link>
        </div>
      ))}
      <div className="flex items-center mt-3">
        {displayAmount < 48 ? (
          <button
            onClick={() => {
              setDisplayAmount(displayAmount + 16);
            }}
          >
            Show more
          </button>
        ) : null}
      </div>
    </div>
  );
}

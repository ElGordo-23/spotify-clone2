import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { getNewReleases } from '../API/getNewReleases';
import { useAxiosClient } from './AxiosClientProvider';

type Release = {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { id: string; name: string }[];
};

export function NewReleases() {
  const axiosClient = useAxiosClient();
  const [displayAmount, setDisplayAmount] = useState<number>(16);

  const { data: releases, refetch } = useQuery('newReleases', () =>
    getNewReleases(axiosClient, displayAmount),
  );

  const navigate = useNavigate();

  return (
    <div>
      <h2 className="font-extrabold text-6xl text-white translate-x-8">
        New Releases
      </h2>
      <div className=" grid grid-cols-4 gap-24 items-center bg-gray-700 text-white p-9">
        {releases?.map((release: Release) => (
          <div key={release.artists[0].id} className=" w-32 text-center h-32 ">
            <div className="p-2 hover:bg-gray-500 rounded w-[128px] h-[176px] overflow-hidden">
              <img
                className="p-1"
                src={release.images[0].url}
                alt="Release"
                onClick={() => navigate(`/artist/${release.artists[0].id}`)}
              />

              <Link to={`/artist/${release.artists[0].id}`}>
                <div>
                  <p>{release.name}</p>
                  <p className="text-white text-opacity-70">
                    {release.artists[0].name}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
        <div className="flex items-center mt-3">
          {displayAmount < 48 ? (
            <button
              onClick={() => {
                setDisplayAmount(displayAmount + 16);
                refetch();
              }}
            >
              Show more
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

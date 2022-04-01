import { useEffect, useState } from 'react';
import { getNewReleases } from '../API/getNewReleases';
import { useAxiosClient } from './AxiosClientProvider';

export type Release = {
  id: string;
  name: string;
  images: { url: string }[];
};

export function NewReleases() {
  const [releases, setNewReleases] = useState<Release[]>([]);

  const axiosClient = useAxiosClient();

  useEffect(() => {
    getNewReleases(axiosClient)
      .then((data) => setNewReleases(data?.albums?.items || []))
      .catch((error) => console.log(error));
  }, [axiosClient]);

  console.log(releases);

  return (
    <div className=" grid grid-cols-4 gap-24 items-center ">
      {releases.map((release) => (
        <div key={release.id} className=" w-32 text-center  h-20">
          <img
            className="hover:bg-gray-300"
            src={release.images[0].url}
            alt="Release"
          ></img>
          {release.name}
        </div>
      ))}
    </div>
  );
}

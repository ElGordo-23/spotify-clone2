import { useEffect, useState } from 'react';
import { getNewReleases } from '../API/getNewReleases';
import { useAxiosClient } from './AxiosClientProvider';

export type Release = {
  id: string;
  name: string;
};

export function NewReleases() {
  const [releases, setNewReleases] = useState<Release[]>([]);

  const axiosClient =  useAxiosClient()


  useEffect(() => {
    getNewReleases(axiosClient).then((data) => setNewReleases(data?.albums?.items || [])).catch((error)=>console.log(error));
  }, [axiosClient]);

  return (
    <div className=" grid grid-cols-2 gap-10 items-center ">
      {releases.map((release) => (
            <div
              key={release.id}
              className="hover:bg-gray-300  font-bold py-2 px-4 border-4 border-black w-32 text-center  h-20"
            >
              {release.name}
            </div>
          ))}
    </div>
  );
}

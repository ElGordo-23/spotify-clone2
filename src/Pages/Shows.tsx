import { useNavigate } from 'react-router-dom';
import { useGetShows } from '../API/getUserShows';

export function Shows() {
  const { data: shows } = useGetShows();

  const navigate = useNavigate();

  return (
    <div className="mt-4 ml-4">
      <h2 className="font-extrabold text-6xl z-20 text-white">Your Shows</h2>
      <div className="grid grid-cols-4 gap-24 items-center bg-gray-700 text-white">
        {shows?.map((show) => (
          <div key={show.show.id} className=" w-32 text-center h-32 ">
            <div className="p-2 hover:bg-gray-500 rounded w-[128px] h-[176px] overflow-hidden">
              <img
                className="p-1"
                src={show.show.images[0].url}
                alt="Release"
                onClick={() => navigate(`/shows/${show.show.id}`)}
              />

              <div>
                <p>{show.show.name}</p>
                <p className="text-white text-opacity-70">
                  {show.show.publisher}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

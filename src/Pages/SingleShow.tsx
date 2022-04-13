import { Link, useParams } from 'react-router-dom';
import { useSingleShow } from '../API/getSingleShow';
import { usePlayerControls } from '../Components/PlayerControlsProvider';
import Expand from '../Components/Testtest';

export function SingleShow() {
  const { showId } = useParams();
  const { setSongQueue } = usePlayerControls();

  const { data: show } = useSingleShow(showId);

  console.log(show);

  return (
    <div className="ml-4 mt-4">
      <h2 className="font-extrabold text-6xl text-white">{show?.name}</h2>
      <br />
      <span className="font-bold text-3xl z-20 text-white">
        {show?.publisher}
      </span>
      <br />
      <span className="text-white">{show?.description}</span>
      <ul className="mt-5">
        {show
          ? show?.episodes.items.map((show) => (
              <li className="flex gap-2 group" key={show.id}>
                <img
                  src={show.images[0].url}
                  alt="Album Cover"
                  className="w-12 h-12 mt-3 object-cover"
                />
                <div className="flex flex-col items-baseline mt-3">
                  <button
                    className="text-white hover:bg-gray-500 rounded"
                    onClick={() => {
                      setSongQueue(show.uri);
                    }}
                  >
                    {show.name}
                  </button>
                  <Expand description={show.description} />
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

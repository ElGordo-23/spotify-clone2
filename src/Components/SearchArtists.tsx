import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../API/searchArtists';

type SearchArtistProps = {
  searchKey: string;
};

export function SearchArtists({ searchKey }: SearchArtistProps) {
  const navigate = useNavigate();

  const { data: searchedArtists } = useSearch(searchKey);
  console.log(searchKey);
  return (
    <div>
      <h2 className="font-extrabold text-6xl text-white translate-x-8">
        Search
      </h2>
      <div className="grid grid-cols-4 gap-24 items-center bg-gray-700 text-white p-9">
        {searchedArtists?.map((artist) => (
          <div key={artist?.id} className=" w-32 text-center  h-20">
            {artist?.images?.[0]?.url && (
              <img
                className="hover:bg-gray-300"
                src={artist.images[0].url}
                alt="Artist"
                onClick={() => navigate(`/artist/${artist.id}`)}
              ></img>
            )}
            <Link to={`/artist/${artist.id}`}>
              <div>
                <p>{artist?.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { searchArtists } from '../API/searchArtists';
import { useAxiosClient } from './AxiosClientProvider';

type SearchArtistProps = {
  searchKey: string;
};

export function SearchArtists({ searchKey }: SearchArtistProps) {
  const axiosClient = useAxiosClient();
  const navigate = useNavigate();

  const { data: searchedArtists } = useQuery(
    'search',
    () => searchArtists(axiosClient, searchKey),
    {},
  );

  console.log(searchedArtists);
  return (
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
  );
}

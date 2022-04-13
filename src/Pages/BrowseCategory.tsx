import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCategoryPlaylists } from '../API/getSingleBrowseCategory';

export function BrowseCategory() {
  const { categoryId } = useParams();

  const { data: categoryPlaylists } = useGetCategoryPlaylists(categoryId);

  const navigate = useNavigate();

  const categoryName = categoryId;
  let nameCapitalized;

  if (categoryName) {
    nameCapitalized =
      categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1);
  }

  return (
    <div>
      <h2 className="font-extrabold text-6xl text-white translate-x-8 mt-4">
        {nameCapitalized}
      </h2>
      <div className="grid grid-cols-4 gap-24 items-center bg-gray-700 text-white p-9">
        {categoryPlaylists?.playlists?.items?.map((playlist) => (
          <div key={playlist.id} className=" w-32 text-center h-32 ">
            <div className="p-2 hover:bg-gray-500 rounded w-[128px] h-[176px] overflow-hidden">
              <img
                className="p-1"
                src={playlist.images[0].url}
                alt={playlist.name}
                onClick={() =>
                  navigate(`/userPlaylists/${playlist.id}/${playlist.name}`)
                }
              />

              <Link to={`/userPlaylists/${playlist.id}/${playlist.name}`}>
                <div>
                  <span>{playlist.name}</span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

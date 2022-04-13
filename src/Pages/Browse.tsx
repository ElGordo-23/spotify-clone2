import { Link, useNavigate } from 'react-router-dom';
import { useBrowseCategories } from '../API/getBrowseCategories';

export function Browse() {
  const { data: browseCategories } = useBrowseCategories();
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="font-extrabold text-6xl text-white translate-x-8 mt-4">
        Browse
      </h2>
      <div className=" grid grid-cols-4 gap-24 items-center bg-gray-700 text-white p-9">
        {browseCategories
          ? browseCategories.categories?.items?.map((category) => (
              <div key={category.id} className=" w-32 text-center h-32 ">
                <div className="p-2 hover:bg-gray-500 rounded w-[128px] h-[176px] overflow-hidden">
                  <img
                    className="p-1"
                    src={category.icons[0].url}
                    alt={category.name}
                    onClick={() => navigate(`/browse/${category.id}`)}
                  />

                  <Link to={`/browse/${category.id}`}>
                    <div>
                      <span>{category.name}</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

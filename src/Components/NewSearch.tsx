import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../API/searchArtists';

export default function Search() {
  const [searchKey, setSearchKey] = useState<string>('');
  const { refetch } = useSearch(searchKey);
  const { data: searchedArtists } = useSearch(searchKey);
  const navigate = useNavigate();

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full text-white">
            <input
              className="bg-gray-800 text-white rounded-lg w-64 h-12"
              onChange={(e) => {
                setSearchKey(e.target.value);
                refetch();
              }}
              value={searchKey}
              placeholder="Search"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-96 mt-2 origin-top-right bg-slate-600 text-white rounded-md shadow-lg ring-1 ring-white z-30 p-4">
            <div className="px-1 py-1 ">
              {searchedArtists?.map((artist) => (
                <Menu.Item>
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
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

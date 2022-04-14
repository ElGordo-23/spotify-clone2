import { Popover, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../API/searchArtists';

export default function Search() {
  const [searchKey, setSearchKey] = useState<string>('');

  const { refetch, data: searchedArtists } = useSearch(searchKey);

  const navigate = useNavigate();

  const queryCLient = useQueryClient();

  const clearSearch = () => {
    queryCLient.invalidateQueries('search');
  };

  const clearArtistQuery = () => {
    queryCLient.invalidateQueries('singleArtist');
  };

  return (
    <div className="absolute ml-5">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className="
                text-white group rounded-md inline-flex items-center text-base font-medium"
            >
              <span>Search</span>
              <SearchIcon
                className="
                  ml-2 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 max-w-sm px-4 mt-3">
                {({ close }) => (
                  <div className="flex flex-col flex-grow rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ">
                    <div className="p-4 bg-white">
                      <input
                        className="bg-gray-800 text-white rounded-lg w-64 h-12 pl-2"
                        onChange={(e) => {
                          setSearchKey(e.target.value);
                          refetch();
                        }}
                        value={searchKey}
                        placeholder="Search"
                      />
                    </div>
                    <div className="flex flex-col hover:bg-gray-500 rounded align-baseline z-0 group">
                      <ul className="bg-white overflow-auto">
                        {searchedArtists?.map((artist) => (
                          <li
                            key={artist?.id}
                            className="grid grid-cols-2 text-center h-20 ml-4 mr-4 hover:bg-gray-300 rounded cursor-pointer"
                            onClick={() => {
                              navigate(`/artist/${artist.id}`);
                              setSearchKey('');
                              // clearArtistQuery();
                              close();
                            }}
                          >
                            <div className="flex items-center w-64">
                              {artist?.images?.[0]?.url && (
                                <img
                                  className=" w-12 h-12 rounded-full"
                                  src={artist.images[0].url}
                                  alt="Artist"
                                ></img>
                              )}

                              <span className="ml-3">{artist?.name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

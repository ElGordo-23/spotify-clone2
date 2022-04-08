import { useEffect, useState } from 'react';
import { getUserProfile } from '../API/getUserProfile';
import { useAxiosClient } from '../Components/AxiosClientProvider';
import Example from '../Components/Testtest';

type User = {
  display_name: string;
  id: string;
};

export function UserProfile() {
  const axiosClient = useAxiosClient();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserProfile(axiosClient)
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, [axiosClient]);

  return (
    <div>
      {user ? (
        <h2 className="relative left-72 top-24 font-extrabold text-6xl">
          {user.display_name}
        </h2>
      ) : null}
      <Example />
    </div>
  );
}

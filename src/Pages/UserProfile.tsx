import { useGetUser } from '../API/getUserProfile';

export function UserProfile() {
  const { data: user } = useGetUser();

  return (
    <div>
      {user ? (
        <h2 className="relative left-72 top-24 font-extrabold text-6xl">
          {user.display_name}
        </h2>
      ) : null}
    </div>
  );
}

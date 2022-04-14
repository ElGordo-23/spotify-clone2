import { useGetUser } from '../API/getUserProfile';

export function UserProfile() {
  const { data: user } = useGetUser();

  return (
    <div>
      {user ? (
        <>
          <h2 className="relative left-72 top-24 font-extrabold text-6xl">
            {user.display_name}
          </h2>
          <ul className="list-decimal text-white relative left-72 top-24">
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
          </ul>
        </>
      ) : null}
    </div>
  );
}

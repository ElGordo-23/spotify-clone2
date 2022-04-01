export function Login() {
  const CLIENT_ID: string = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI: string = 'http://localhost:3000';
  const AUTH_ENDPOINT: string = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE: string = 'token';

  return (
    <div className="flex flex-col items-center top-24 relative">
      <div className="p-7 border-2 border-black">
        <a
          className=""
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
}

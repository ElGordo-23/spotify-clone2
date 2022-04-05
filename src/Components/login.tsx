const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SPACE_DELIMITER = '%20';
const SCOPES: string[] = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-private',
  'app-remote-control',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export function Login() {
  return (
    <div className="flex flex-col items-center top-24 relative">
      <div className="p-7 border-2 border-black">
        <a
          className=""
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
}

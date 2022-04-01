import { useToken } from './API/useToken';
import { AxiosClientProvider } from './Components/AxiosClientProvider';
import { Home } from './Components/Home';
import { Login } from './Components/login';

function App() {
  const { token, logout } = useToken();

  return (
    <div>
      {!token ? (
        <Login />
      ) : (
        <AxiosClientProvider>
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
          <Home />
        </AxiosClientProvider>
      )}
    </div>
  );
}

export default App;

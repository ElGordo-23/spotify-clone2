import { useToken } from './API/useToken';
import { AxiosClientProvider } from './Components/AxiosClientProvider';
import { Home } from './Components/Home';
import { Login } from './Components/login';

function App() {
  const { token } = useToken();

  return (
    <div>
      {!token ? (
        <Login />
      ) : (
        <AxiosClientProvider>
          <Home />
        </AxiosClientProvider>
      )}
    </div>
  );
}

export default App;

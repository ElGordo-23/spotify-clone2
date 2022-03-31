export function Logout(setToken) {
  const logout = (setToken) => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  return <button onClick={logout}>Logout</button>;
}

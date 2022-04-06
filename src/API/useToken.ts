import { useEffect, useState } from 'react';

export const useToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const token = window.localStorage.getItem('token');

    if (!token && typeof hash === 'string') {
      const accessTokenFromUrl = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        ?.split('=')[1];

      if (accessTokenFromUrl) {
        window.location.hash = '';
        window.localStorage.setItem('token', accessTokenFromUrl);
        setAccessToken(accessTokenFromUrl);
      }
    }

    if (token) {
      setAccessToken(token);
    }
  }, [accessToken]);

  const logout = () => {
    setAccessToken(null);
    window.localStorage.removeItem('token');
  };

  return { token: accessToken, logout };
};

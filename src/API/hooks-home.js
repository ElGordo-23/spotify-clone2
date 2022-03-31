import axios from 'axios';

export const getNewReleases = async (token) => {
  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/browse/new-releases',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: { country: 'SE', limit: 10, offset: 0 },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchArtists = async (token, searchKey) => {
  try {
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: 'artist',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://37.140.199.40:5010/api/'
    : process.env.API_URL;

const useApi = () => {
  const auth = async (data) => {
    try {
      const resp = await axios(`${API_URL}/auth/login`, {
        method: 'post',
        data,
      });

      return resp;
    } catch (err) {
      console.error(err.message);
      return err.response;
    }
  };

  const getSongs = async () => {
    try {
      const resp = await axios(`${API_URL}/audio`);

      return resp.data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const sendSong = async (data, token) => {
    try {
      const resp = await axios({
        method: 'post',
        url: `${API_URL}/audio`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        },
      });

      return resp;
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateSong = async (song, token) => {
    try {
      const resp = await axios({
        method: 'put',
        url: `${API_URL}/audio`,
        data: song,
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      return resp;
    } catch (err) {
      console.error(err.message);
      return err.response;
    }
  };

  const deleteSong = async (id, token) => {
    try {
      const resp = await axios({
        method: 'delete',
        url: `${API_URL}/audio`,
        data: id,
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      return resp;
    } catch (err) {
      console.error(err.message);
      return err.response;
    }
  };

  return { auth, getSongs, sendSong, updateSong, deleteSong };
};

export default useApi;

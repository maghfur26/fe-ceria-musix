import axios from 'axios';

const API_URL = 'https://serverceriamusic-production.up.railway.app/api/user/login';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });

    const token = response.data?.data?.token;

    if (!token) {
      throw new Error('Invalid response: Token not found');
    }

    return {
      token,
      user: response.data.data.user, 
    };
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

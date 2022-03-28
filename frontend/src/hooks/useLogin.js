import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../features/auth/authSlice';

export const useLogin = () => {
  const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;

  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const login = async (userData) => {
    setError(null);
    setUser(null);
    setLoading(true);
    try {
      const response = await await axios.post(`${LOGIN_URL}`, userData);
      if (!response) {
        throw new Error('Could not complete signin');
      }
      localStorage.setItem(
        'auth-data',
        JSON.stringify({ token: response.data.token, user: response.data.user })
      );
      dispatch(loginAction(response.data));
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { error, loading, login, user };
};

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../features/auth/authSlice';

export const useSignup = () => {
  const SIGNUP_URL = `${process.env.REACT_APP_API_URL}/auth/signup`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const signup = async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await await axios.post(`${SIGNUP_URL}`, userData);
      console.log(response);
      if (!response) {
        throw new Error('Could not complete signup');
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

  return { error, loading, signup };
};

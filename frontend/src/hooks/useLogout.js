import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../features/auth/authSlice'


export const useLogout = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const logout = async () => {
    setError(null);
    setLoading(true);
    try {
      await localStorage.removeItem('auth-data');
      dispatch(logoutAction());
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { error, loading, logout };
};

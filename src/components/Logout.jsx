import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Logout = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  }, [setToken, navigate]);

  return null;
};

export default Logout;



import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import useStore from '@/store';

const Logout = () => {
  const navigate = useNavigate();
  const logout = useStore((state) => state.auth.logout);
  const { data } = useStore((state) => state.auth.user);

  useEffect(() => {
    if (!data) {
      navigate('/login');
    } else {
      logout();
    }
  }, [data, logout]);

  return <></>;
};

export default Logout;

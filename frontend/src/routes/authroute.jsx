import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadLoginuser } from '../actions/Useraction';

const Authroute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.Loginuser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!user?._id) {
        await dispatch(LoadLoginuser());
      }
      setLoading(false);
    };
    loadUser();
  }, [dispatch, user?._id]);

  useEffect(() => {
    if (!loading && user?.usertype) {
      const basePath = `/${user.usertype.toLowerCase()}`;
      const currentPath = window.location.pathname.toLowerCase();
      if (!currentPath.startsWith(basePath)) {
        navigate(basePath, { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return children;
};

export default Authroute;
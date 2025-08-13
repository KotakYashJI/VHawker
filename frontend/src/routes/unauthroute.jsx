import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadLoginuser } from '../actions/Useraction';
import { useNavigate } from 'react-router-dom';

const UnauthRoute = ({ children,userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginuser = useSelector((state) => state.user.Loginuser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        if (!loginuser) {
          await dispatch(LoadLoginuser());
        }

        const usertype = loginuser?.usertype;
        console.log(loginuser);
        
        if (usertype) {
          navigate(`/${usertype}`, { replace: true });
        }
      } catch (error) {
        console.error("Error checking login:", error);
        navigate(`/${userType}/login`);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [dispatch, loginuser, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UnauthRoute;
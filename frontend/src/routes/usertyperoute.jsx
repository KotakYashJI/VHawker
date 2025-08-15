import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadLoginuser } from '../actions/Useraction';
import { useNavigate } from 'react-router-dom';

const Usertyperoute = ({ children, userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginuser = useSelector((state) => state.user.Loginuser);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const baseurl = "https://vhawker.onrender.com";

  useEffect(() => {
    const fetchUser = async () => {
      if (!loginuser || !loginuser._id) {
        await dispatch(LoadLoginuser());
      }
      setLoading(false);
    };

    fetchUser();
  }, [dispatch]);


  useEffect(() => {
    if (loading) return;

    const loginUserType = loginuser?.usertype?.toLowerCase();
    console.log(loginUserType);

    const expectedUserType = userType?.toLowerCase();

    if (!loginUserType) {
      navigate(`${baseurl}/${expectedUserType}/login`, { replace: true });
      return;
    }

    if (loginUserType === expectedUserType) {
      setAuthorized(true);
    } else {
      navigate(`${baseurl}/${loginUserType}`, { replace: true });
    }
  }, [loading, loginuser?.usertype, userType, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return authorized ? children : null;
};

export default Usertyperoute;
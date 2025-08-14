import { useDispatch, useSelector } from 'react-redux';
import { LoadLoginuser, Logoutuser } from '../actions/Useraction';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCart } from 'lucide-react';
import { crruserproducts } from "../actions/Productaction";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.Loginuser);

  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(LoadLoginuser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(Logoutuser());
    setUserProfileOpen((prev) => !prev);
    navigate('/');
  };

  const handleuserproducts = (user) => {
    dispatch(crruserproducts(user));
    setUserProfileOpen((prev) => !prev);
    navigate(`${user.usertype.toLowerCase()}/products`);
  }

  const toggleMenu = () => {
    setMenuOpen(true);
    setTimeout(() => {
      setMenuOpen(false);
    }, 1500);
  };

  const toggleProfile = () => {
    setUserProfileOpen(true);
    setTimeout(() => {
      setUserProfileOpen(false);
    }, 1500);
  };

  return (
    <>
      <div className="h-20 w-full fixed z-50 bg-white shadow flex justify-between px-6 md:px-10 items-center text-xl">
        <div className="text-2xl font-bold text-blue-600">Vhawker</div>
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-lg hover:underline">Home</Link>
          <Link to="/about" className="text-lg hover:underline">About</Link>
          <Link to="/contact" className="text-lg hover:underline">Contact</Link>
          {user?._id ? (
            <>
              {user.usertype?.toLowerCase() === 'wholesaler' && (
                <Link to="/wholesaler/create-product" className="hover:underline">Create Product</Link>
              )}
              <Link to={`/${user.usertype}`} className="hover:underline">{user.usertype}Page</Link>
            </>
          ) : (
            <Link to="/admin" className="hover:underline">Admin</Link>
          )}
        </div>
        <div className="flex items-center gap-6">
          {user?.usertype && (
            <>
              {user.usertype !== "Wholesaler" && user.usertype !== "admin" && (
                <div className="text-black cursor-pointer" onClick={() => navigate('/cart')}>
                  <ShoppingCart />
                </div>
              )}
              <FontAwesomeIcon
                icon={faUser}
                className="cursor-pointer text-gray-700 hover:text-black"
                onClick={toggleProfile}
              />
            </>
          )}
          <div className="md:hidden">
            <FontAwesomeIcon
              icon={menuOpen ? faTimes : faBars}
              className="cursor-pointer text-gray-800 text-2xl transition"
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>
      <div
        className={`md:hidden fixed top-20 right-0 w-full bg-white z-50 shadow-lg transform transition-all duration-500 ease-in-out ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center gap-5 py-6 text-lg">
          <Link to="/" onClick={toggleMenu} className="hover:underline transition">Home</Link>
          <Link to="/about" onClick={toggleMenu} className="hover:underline transition">About</Link>
          <Link to="/contact" className="text-lg hover:underline">Contact</Link>
          {user?._id ? (
            <>
              {user.usertype?.toLowerCase() === 'wholesaler' && (
                <Link to="/wholesaler/create-product" onClick={toggleMenu} className="hover:underline transition">
                  Create Product
                </Link>
              )}
              <Link to={`/${user.usertype}`} onClick={toggleMenu} className="hover:underline transition">
                {user.usertype}Page
              </Link>
            </>
          ) : (
            <Link to="/admin/login" onClick={toggleMenu} className="hover:underline transition">Admin</Link>
          )}
        </div>
      </div>
      {userProfileOpen && user && (
        <div className="w-64 absolute top-20 right-4 rounded-xl border border-gray-300 bg-white shadow-lg p-4 z-50">
          <h1 className="text-lg font-semibold text-gray-800">👤 {user?.username}</h1>
          <h2 className="text-sm text-gray-600">
            <div className='flex flex-col mt-2'>
              <span>
                Role: <span className="capitalize font-medium">{user?.usertype}</span>
              </span>
              {user.usertype !== "Wholesaler" || user.usertype !== "admin" && <span>
                Products : <span
                  onClick={() => handleuserproducts(user)}
                  className='capitalize font-medium cursor-pointer hover:text-blue-400'>products</span>
              </span>}
            </div>
          </h2>
          <button
            onClick={handleLogout}
            className="mt-3 h-10 cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
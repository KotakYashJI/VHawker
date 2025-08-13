import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoadAllWholesalers, LoginWholesaler } from "../../actions/Wholesaleraction";
import { LoadLoginuser } from "../../actions/Useraction";

const WholesalerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginuser = useSelector((state) => state.user.Loginuser);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = (user) => {
    dispatch(LoginWholesaler(user));
    navigate("/wholesaler", { replace: true });
    reset();
  };

  useEffect(() => {
    dispatch(LoadAllWholesalers());
    dispatch(LoadLoginuser());
    loginuser && loginuser.usertype && navigate(loginuser.usertype.toLowerCase())
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4 py-10">
      <div className="w-full max-w-md bg-white mt-20 rounded-2xl shadow-xl px-8 py-10">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">Wholesaler Login</h2>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-400 text-white py-3 rounded-xl hover:bg-indigo-500 transition-all duration-200 font-semibold"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/wholesaler/register")}
            className="text-indigo-400 text-base font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default WholesalerLogin;
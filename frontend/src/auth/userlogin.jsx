import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getusers, Loginuser } from "../actions/Useraction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserLogin = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const handlelogin = (user) => {
    const loginuser = users?.find((us) =>
      us.email === user.email && us.password === user.password
    );

    if (loginuser) {
      dispatch(Loginuser(loginuser));
      toast.success("Login Successful");
      navigate("/products");
    } else {
      toast.error("Invalid credentials");
    }

    reset();
  };

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#393E46] to-[#222831] px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
        <h2 className="text-3xl font-bold text-center text-[#00ADB5] mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit(handlelogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z][^\s@]*@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^.{6}$/,
                  message: "Password must be 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#00ADB5] text-white py-3 rounded-xl hover:bg-[#0099a8] transition-all duration-200 font-semibold"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#00ADB5] font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
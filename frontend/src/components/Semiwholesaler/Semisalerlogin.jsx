import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import {
  LoadAllSemiwholesaler,
  LoginSemiwholesaler,
} from "../../actions/Semiwholesaleraction";

const SemiwholesalerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const semiwholesalers = useSelector((state) => state.semiwholesaler.Semiwholesaler);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlelogin = async (user) => {
    const foundUser = semiwholesalers?.find(
      (semi) =>
        semi.email === user.email && semi.password === user.password
    );

    if (foundUser) {
      await dispatch(LoginSemiwholesaler(foundUser));
      toast.success("Login successful");
      navigate("/semiwholesaler", { replace: true });
    } else {
      toast.error("User Not Found!");
    }

    reset();
  };

  useEffect(() => {
    dispatch(LoadAllSemiwholesaler());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl mt-20 shadow-xl px-8 py-10">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">Login Semiwholesaler</h2>

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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-green-400 text-white py-3 rounded-xl hover:bg-green-500 transition-all duration-200 font-semibold"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-xl text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/semiwholesaler/register")}
            className="text-green-400 text-xl font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default SemiwholesalerLogin;
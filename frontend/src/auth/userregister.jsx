import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getusers, registeruser } from "../actions/Useraction";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify"

const UserRegister = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const password = watch("password");

    const handleregister = (user) => {
        user.id = nanoid();
        try {
            const registereduser = users.filter((ruser) =>
                ruser.email === user.email);
            if (registereduser.length === 0) {
                dispatch(registeruser(user));
            } else toast.error("User Already Registered");
        } catch (error) {
            toast.error(error);
        }
        reset();
    }

    useEffect(() => {
        dispatch(getusers());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#393E46] to-[#222831] px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
                <h2 className="text-3xl font-bold text-center text-[#00ADB5] mb-6">Register User</h2>
                <form onSubmit={handleSubmit(handleregister)} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="username"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>
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

                     <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
                            {...register("confirm_password", {
                                required: "Confirm-Password is required",
                                validate: (value) => value === password || "Passwords do not match",
                                pattern: {
                                    value: /^.{6}$/,
                                    message: "Confirm-Password must be 6 characters",
                                },
                            })}
                        />
                        {errors.confirm_password && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>
                        )}
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-[#00ADB5] text-white py-3 rounded-xl hover:bg-[#0099a8] transition-all duration-200 font-semibold"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-[#00ADB5] font-semibold cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default UserRegister;
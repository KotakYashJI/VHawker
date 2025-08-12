import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginadmin, LoadLoginadmin } from "..//../actions/adminaction"
import { LoadLoginuser } from "../../actions/Useraction";

const AdminLogin = () => {
    const dispatch = useDispatch();
    const [adminemail, setadminemail] = useState("admin123@gmail.com");
    const [adminpassword, setadminpassword] = useState("123456");
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handlelogin = (user) => {
        if (user.email == adminemail && user.password == adminpassword) {
            user.usertype = "admin";
            dispatch(loginadmin(user));
            navigate("/admin");
        } else {
            toast.error("Invalid credentials");
        }
        reset();
    };

    useEffect(() => {
        dispatch(LoadLoginuser());
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#caccd0] to-[#fafcff] px-4 py-10">
            <div className="w-full max-w-md bg-white mt-20 rounded-2xl shadow-xl px-8 py-10">
                <h2 className="text-3xl font-bold text-center text-[#00ADB5] mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit(handlelogin)} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
                            value={"admin123@gmail.com"}
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
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00ADB5] outline-none"
                            value={123456}
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
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-[#00ADB5] text-white py-3 rounded-xl hover:bg-[#0099a8] transition-all duration-200 font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
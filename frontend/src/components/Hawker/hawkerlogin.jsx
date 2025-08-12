import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadAllHawkers, LoginHawker } from "../../actions/Hawkeraction";
import { useEffect } from "react";
import { toast } from "react-toastify";

const HawkerLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hawkers = useSelector((state) => state.hawker.hawkers);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleLogin = (user) => {
        const loginhawker = hawkers.find(
            (hawker) => hawker.email === user.email && hawker.password === user.password
        );

        if (loginhawker) {
            const userdata = {
                _id: loginhawker._id,
                usertype: "hawker",
            };
            dispatch(LoginHawker(userdata));
            navigate("/hawker", { replace: true });
        } else {
            toast.error("User Not Found!");
        }
        reset();
    };
    
    useEffect(() => {
        dispatch(LoadAllHawkers());
        const storedUser = JSON.parse(localStorage.getItem("loginuser"));
        if (storedUser && storedUser.usertype === "hawker") {
            navigate("/hawker", { replace: true });
        }
    }, [dispatch, navigate]);

    return (
        <div className="min-h-screen flex items-center bg-[#f9f9f9] justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white mt-20 rounded-2xl shadow-xl px-8 py-10">
                <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Login Hawker</h2>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Za-z][^\s@]*@[^\s@]+\.[^\s@]{2,}$/,
                                    message: "Invalid email",
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl outline-none"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition-all font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="text-center text-xl text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/hawker/register")}
                        className="text-yellow-500 font-semibold cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default HawkerLogin;
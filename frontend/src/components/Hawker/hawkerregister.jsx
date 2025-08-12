import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerhawker, LoadAllHawkers } from "../../actions/Hawkeraction"

const hawkerregister = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const password = watch("password");

    const handleregister = (user) => {
        try {
            dispatch(registerhawker(user));
        } catch (error) {
            console.log(error);
        }
        reset();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-4xl bg-white rounded-xl mt-[5%] shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">Hawker Register</h2>
                <form onSubmit={handleSubmit(handleregister)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            {...register("username", { required: "Username is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirm_password", {
                                required: "Please confirm password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            placeholder="Enter city"
                            {...register("city", { required: "City is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-1/3 cursor-pointer bg-yellow-400 text-white py-3 rounded-md hover:bg-yellow-500 transition font-semibold"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-xl text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <span
                        className="text-yellow-400 text-xl font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/hawker/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}

export default hawkerregister
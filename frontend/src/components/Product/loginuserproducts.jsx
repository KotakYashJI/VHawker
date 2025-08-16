import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { LoadLoginuser } from "../../actions/Useraction";
import { useNavigate } from "react-router-dom";

const loginuserproducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.Loginuser);

    useEffect(() => {
        dispatch(LoadLoginuser());
    }, []);

    useEffect(() => {
    }, [user]);

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-25 px-4">
            <h1 className="text-4xl font-bold text-center mb-10 text-[#222831]">You're Products</h1>
            <div className="w-full">
                <div className="flex flex-wrap justify-center gap-10 mt-10">
                    {user?.products?.map((product) => (
                        <div
                            key={product?.id}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rouded-xl shadow-lg hover:shadow-2xl
                transform hover:-translate-y-0 rounded-2xl transition-all duration-300">
                            <img className="h-60 w-full object-cover rounded-t-xl" src={product.productimg} alt={product.productname} />
                            <div className="p-5 text-[#393E46]">
                                <h2 className="text-xl font-semibold mb-2">{product.productname}</h2>
                                <p className="text-md mb-1">💰 Price: ₹{product.productprice}</p>
                                {product.productquantity > 0 ?
                                    <p className="text-md mb-1">📦 Qty: {product.productquantity}</p>
                                    : <span className='text-red-400'>Not Availble</span>}
                                <p className="text-md mb-3 text-gray-600">
                                    {product.description?.slice(0, 30)}<span onClick={() => navigate(`/${user.usertype.toLowerCase()}/${user._id}/product/${product.id}`)} className="text-blue-500 text-xl cursor-pointer">...more</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default loginuserproducts
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadCartproducts,
  IncreaseQuantity,
  DecreaseQuantity,
} from "../../actions/Cartaction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadLoginuser } from "../../actions/Useraction";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.Cart);
  const loginuser = useSelector((state) => state.user.Loginuser);

  useEffect(() => {
    dispatch(LoadLoginuser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(LoadCartproducts(loginuser._id));
  }, [loginuser._id]);

  const handleIncrease = (index) => {
    dispatch(IncreaseQuantity(index, loginuser._id));
  };

  const handleDecrease = (index) => {
    dispatch(DecreaseQuantity(index, loginuser._id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    navigate("/payment");
  };

  const total = cart.reduce(
    (acc, item) => acc + item.productprice * item.productquantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-red-400 text-xl text-center mt-10">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 rounded mt-10">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-md rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.productimg}
                    alt={item.productname}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.productname}</h2>
                    <p className="text-gray-600">₹{item.productprice}</p>
                    <p className="text-sm text-gray-500">
                      Max: {item.maxquantity ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mt-4 md:mt-0 space-x-3">
                  <button
                    onClick={() => handleDecrease(index)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.productquantity}</span>
                  <button
                    onClick={() => handleIncrease(index)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
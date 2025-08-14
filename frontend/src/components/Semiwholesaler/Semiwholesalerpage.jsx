import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadLoginuser } from '../../actions/Useraction';
import { useNavigate } from 'react-router-dom';
import { addtocart, LoadCartproducts } from '../../actions/Cartaction';
import { GetallWholesalerProducts } from '../../actions/Wholesaleraction';
import { toast } from 'react-toastify';
import '../../styles/hideScrollbar.css';

const Semiwholesaler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginuser = useSelector((state) => state.user.Loginuser);
  const wholesalers = useSelector((state) => state.wholesaler.wholesalerproducts);
  
  const cartproducts = useSelector((state) => state.cart.Cart);

  const [cartCount, setCartCount] = useState({});
  const [selectedWholesalers, setSelectedWholesalers] = useState([]);

  useEffect(() => {
    dispatch(LoadLoginuser());
    dispatch(GetallWholesalerProducts());
    dispatch(LoadCartproducts());
  }, [dispatch]);

  useEffect(() => {
    const countMap = {};
    cartproducts.forEach((product) => {
      countMap[product.id] = product.productquantity;
    });
    setCartCount(countMap);
  }, [cartproducts]);

  const handleCart = (buyerid, product, sellerId) => {
    const productId = product.id;
    const currentCount = cartCount[productId] || 0;
    const maxAllowed = Number(product.productquantity);

    if (currentCount >= maxAllowed) {
      toast.error("You've reached the quantity limit for this product.");
    } else {
      dispatch(addtocart(buyerid, product, sellerId));
      setCartCount((prev) => ({
        ...prev,
        [productId]: currentCount + 1,
      }));
    }
  };

  const cityWholesalers = wholesalers?.filter(
    (wholesaler) =>
      wholesaler?.city?.toLowerCase() === loginuser?.city?.toLowerCase()
  );

  const visibleWholesalers =
    selectedWholesalers.length === 0
      ? cityWholesalers
      : cityWholesalers.filter((wholesaler) =>
        selectedWholesalers.includes(wholesaler._id)
      );

  const productsToShow = visibleWholesalers?.flatMap((wholesaler) =>
    wholesaler.products.map((product) => ({
      ...product,
      wholesalerName: wholesaler.username,
      sellertype: wholesaler.usertype,
      sellerId: wholesaler._id,
    }))
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col md:flex-row gap-6 p-4">
      <div className="w-full md:w-1/5 mt-20 bg-white shadow-lg rounded-xl p-4 sticky top-6 h-fit max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter by Wholesaler</h2>

        {cityWholesalers?.length > 0 ? (
          cityWholesalers.map((wholesaler) => (
            <div key={wholesaler._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedWholesalers.includes(wholesaler._id)}
                onChange={() => {
                  setSelectedWholesalers((prev) =>
                    prev.includes(wholesaler._id)
                      ? prev.filter((id) => id !== wholesaler._id)
                      : [...prev, wholesaler._id]
                  );
                }}
                className="mr-2"
              />
              <label className="text-gray-700">{wholesaler.username}</label>
            </div>
          ))
        ) : (
          <div className="text-gray-500 mt-2 text-sm text-center">
            🚫 No wholesalers found in your city.
          </div>
        )}
      </div>
      <div className="w-full md:w-4/5 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsToShow?.map((product, index) => {
            const quantityInCart = cartCount[product.id] || 0;
            const isAvailable = quantityInCart < product.productquantity;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[400px]"
              >
                <img
                  src={product.productimg}
                  alt={product.productname}
                  className="h-40 w-full object-cover rounded-t-xl"
                />
                <div className="p-4 text-[#393E46] flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold truncate">{product.productname}</h2>
                    <p className="text-md">💰 ₹{product.productprice}</p>
                    <p className="text-md">📦 Qty: {product.productquantity}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {product.description?.slice(0, 30)}
                      <span
                        onClick={() =>
                          navigate(`/${product.sellertype.toLowerCase()}/${product.sellerId}/product/${product.id}`)
                        }
                        className="text-blue-500 cursor-pointer"
                      >
                        ...more
                      </span>
                    </p>
                  </div>
                </div>
                {isAvailable ? (
                  <div className="px-4 pb-4">
                    <button
                      className="w-full py-2 bg-[#00ADB5] text-white rounded-xl cursor-pointer hover:bg-[#007B83] transition"
                      onClick={() => handleCart(loginuser._id, product, product.sellerId)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                ) : (
                  <span className="text-red-500 text-md font-semibold px-4 pb-4">Not Available</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Semiwholesaler;

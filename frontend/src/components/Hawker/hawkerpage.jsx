import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadLoginuser } from '../../actions/Useraction';
import { useNavigate } from 'react-router-dom';
import { addtocart } from '../../actions/Cartaction';
import { GetallWholesalerProducts } from "../../actions/Wholesaleraction";
import { GetallSemiwholesalerProducts } from "../../actions/Semiwholesaleraction";
import '../../styles/hideScrollbar.css';
import { toast } from 'react-toastify';

const HawkerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginuser = useSelector((state) => state.user.Loginuser);
  const wholesalerproducts = useSelector((state) => state.wholesaler.wholesalerproducts);
  const semiwholesalerproducts = useSelector((state) => state.semiwholesaler.semiwholesalerproducts);
  const cartproducts = useSelector((state) => state.cart.Cart);

  const [cartCount, setCartCount] = useState([]);
  const [selectedWholesalers, setSelectedWholesalers] = useState([]);

  useEffect(() => {
    dispatch(LoadLoginuser());
    dispatch(GetallSemiwholesalerProducts());
    dispatch(GetallWholesalerProducts());
  }, [dispatch]);

  useEffect(() => {
    const countmap = {};
    cartproducts.forEach((product) => {
      countmap[product.id] = product.productquantity;
    });
    setCartCount(countmap);
  }, [cartproducts]);

  const handleCart = (buyerid, product, sellerId) => {
    const productId = product.id;
    const currentCount = cartCount[productId] || 0;
    const maxAllowed = Number(product.productquantity);

    if (loginuser?.usertype === "wholesaler") {
      toast.warn("Wholesalers are not allowed to purchase.");
      return;
    }

    if (loginuser?.usertype === "semiwholesaler") {
      if (currentCount + 1 > maxAllowed) {
        toast.error("Cannot exceed available stock.");
        return;
      }
    } else {
      if (maxAllowed - (currentCount + 1) < 0) {
        toast.error("Not enough stock to decrease quantity.");
        return;
      }
    }

    dispatch(addtocart(buyerid, product, sellerId));
    setCartCount((prev) => ({
      ...prev,
      [productId]: currentCount + 1,
    }));
  };

  const allSellers = [
    ...wholesalerproducts.map(seller => ({ ...seller, usertype: "wholesaler" })),
    ...semiwholesalerproducts.map(seller => ({ ...seller, usertype: "semiwholesaler" })),
  ];

  const citySellers = allSellers.filter(
    (seller) => seller?.city?.toLowerCase() === loginuser?.city?.toLowerCase()
  );

  const visibleSellers =
    selectedWholesalers.length === 0
      ? citySellers
      : citySellers.filter((seller) =>
        selectedWholesalers.includes(seller._id)
      );

  const toggleWholesaler = (id) => {
    setSelectedWholesalers((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 flex flex-col md:flex-row gap-6">
      <div className="w-full mt-20 md:w-1/5 bg-white rounded-xl p-4 shadow-md sticky top-6 md:h-fit max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg md:text-xl font-semibold text-[#222831] mb-4 text-center md:text-left">
          Filter by Seller
        </h2>
        <div className="space-y-2 pr-2">
          {citySellers?.map((seller) => (
            <div key={seller._id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedWholesalers.includes(seller._id)}
                onChange={() => toggleWholesaler(seller._id)}
                className="mr-2"
              />
              <label className="text-gray-700">{seller.username} ({seller.usertype})</label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-4/5">
        <div className="grid mt-25 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleSellers
            ?.flatMap((seller) =>
              seller.products.map((product) => ({
                ...product,
                sellerName: seller.username,
                sellerId: seller._id,
                sellertype: seller.usertype,
              }))
            )
            .map((product, index) => {
              const quantityincart = cartCount[product.id] || 0;
              const isAvailable = quantityincart < product.productquantity;

              return (
                <div
                  key={index}
                  className="bg-white w-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[380px]"
                >
                  <img
                    src={product.productimg}
                    alt={product.productname}
                    className="h-40 w-full object-cover rounded-t-2xl"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between text-[#393E46]">
                    <div>
                      <h2 className="text-lg font-semibold truncate">{product.productname}</h2>
                      <p className="text-md">💰 ₹{product.productprice}</p>
                      {product.productquantity > 0 && <p className="text-md">📦 Qty: {product.productquantity}</p>}
                      <p className="text-gray-600 mt-2 text-sm overflow-hidden line-clamp-2">
                        {product.description.slice(0, 30)}
                        <span
                          onClick={() =>
                            navigate(`/${product.sellertype.toLowerCase()}/${product.sellerId}/product/${product.id}`)
                          }
                          className="text-blue-500 cursor-pointer text-sm"
                        >
                          ...more
                        </span>
                      </p>
                    </div>
                  </div>
                  {isAvailable ? (
                    <div className="px-4 pb-4">
                      <button
                        className="w-full py-2 cursor-pointer bg-[#00ADB5] text-white rounded-xl hover:bg-[#007B83] transition duration-300"
                        onClick={() => handleCart(loginuser._id, product, product.sellerId)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  ) : (
                    <span className="text-red-400 text-xl ml-[8%] mb-[10%]">Not Available!</span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HawkerPage;
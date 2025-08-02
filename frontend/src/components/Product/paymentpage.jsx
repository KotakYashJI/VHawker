import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadCartproducts, paymentgateway } from '../../actions/Cartaction';
import { useNavigate } from 'react-router-dom';
import { LoadLoginuser } from '../../actions/Useraction';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginuser = useSelector((state) => state.user.Loginuser);
  const cartproducts = useSelector((state) => state.cart.Cart);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiPin, setUpiPin] = useState('');

  useEffect(() => {
    dispatch(LoadCartproducts());
    dispatch(LoadLoginuser());
  }, [dispatch]);

  const totalPrice = cartproducts.reduce(
    (total, product) => total + product.productprice * product.productquantity,
    0
  );

  const handlePayment = () => {
    if (paymentMethod === 'upi' && upiPin.length !== 4) {
      alert('Please enter a valid 4-digit UPI PIN');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    const date = new Date();
    const todaydate = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    const paymentdetails = {
      Bill: Number(totalPrice),
      Gst: Number(totalPrice) * 0.10,
      PaymentType: paymentMethod,
      TotalBill: Number(totalPrice + totalPrice * 0.10)
    }

    const OrderData = {
      date: `${todaydate}/${month + 1}/${year}`,
      orderdata: cartproducts,
      buyerId: loginuser._id,
      sellerId: cartproducts[0].sellerId,
      sellertype: cartproducts[0].sellertype,
      buyertype: loginuser?.usertype?.toLowerCase(),
    }

    alert(`Payment successful using ${paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}!`);
    dispatch(paymentgateway(loginuser, OrderData, paymentdetails));
    localStorage.removeItem('cart');
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row gap-6 p-4 bg-[#f5f5f5] justify-center items-start">
      <div className="w-full mt-[5%] lg:w-2/3 bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-bold mb-4 text-center">Your Cart</h2>
        {cartproducts?.length === 0 ? (
          <p className="text-center text-gray-600">Cart is empty</p>
        ) : (
          cartproducts.map((product, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b py-3 px-2"
            >
              <div className="flex gap-3 items-center">
                <img
                  className="h-16 w-16 rounded object-cover"
                  src={product.productimg}
                  alt={product.productname}
                />
                <div>
                  <h3 className="text-base font-semibold">{product.productname}</h3>
                  <p className="text-sm text-gray-600">Price: ₹{product.productprice}</p>
                  <p className="text-sm text-gray-600">Qty: {product.productquantity}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-green-600 sm:text-right">
                Total: ₹{product.productprice * product.productquantity}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Payment Options */}
      <div className="w-full mt-[5%] lg:w-1/3 bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-bold mb-4 text-center">Payment Gateway</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">Select Payment Method:</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI Payment
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery (COD)
            </label>
          </div>
        </div>

        {paymentMethod === 'upi' && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Enter 4-digit UPI PIN:</label>
            <input
              type="password"
              maxLength={4}
              value={upiPin}
              onChange={(e) => setUpiPin(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
              placeholder="1234"
            />
          </div>
        )}

        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <span className="text-lg font-semibold">Total: ₹{totalPrice}</span>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white cursor-pointer py-2 px-4 rounded-md"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
import React, { useEffect, useState } from "react";
import API from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { LoadLoginuser } from "../../actions/Useraction";
import { FaBoxOpen, FaEnvelope } from "react-icons/fa";
import { deletecontact, getallcontacts } from "../../actions/contactaction";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [orderdata, setOrderdata] = useState([]);
  const contactdata = useSelector((state) => state.contact.Contacts);
  const [view, setView] = useState("orders");

  console.log(contactdata);
  
  const handledelete = (id)=>{
    dispatch(deletecontact(id));
  }

  useEffect(() => {
    dispatch(LoadLoginuser());
    dispatch(getallcontacts());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, contactRes] = await Promise.all([
          API.get("/api/orders"),
        ]);
        setOrderdata(orderRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#00ADB5]">
        Admin Dashboard
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setView("orders")}
          className={`flex items-center gap-2 px-4 py-2 rounded shadow-md font-medium transition ${view === "orders"
              ? "bg-[#00ADB5] text-white"
              : "bg-white text-[#00ADB5] border border-[#00ADB5]"
            }`}
        >
          <FaBoxOpen /> Show Orders
        </button>
        <button
          onClick={() => setView("contacts")}
          className={`flex items-center gap-2 px-4 py-2 rounded shadow-md font-medium transition ${view === "contacts"
              ? "bg-[#00ADB5] text-white"
              : "bg-white text-[#00ADB5] border border-[#00ADB5]"
            }`}
        >
          <FaEnvelope /> Show Contact Messages
        </button>
      </div>

      {view === "orders" && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-[#393E46] mb-4">
            Order History
          </h2>
          <table className="min-w-full text-sm text-left text-gray-700 border border-collapse">
            <thead className="bg-gray-100 text-[#00ADB5] text-left text-base">
              <tr>
                <th className="p-2 border">Order ID</th>
                <th className="p-2 border">Buyer</th>
                <th className="p-2 border">Seller</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orderdata.length > 0 ? (
                orderdata.map((order, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 border">{order._id}</td>
                    <td className="p-2 border">{order.buyerid}</td>
                    <td className="p-2 border">{order.sellerid}</td>
                    <td className="p-2 border">₹{order.paymentdata[0].TotalBill}</td>
                    <td className="p-2 border">Pending</td>
                    <td className="p-2 border">
                      {order.orderdate}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "contacts" && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-[#393E46] mb-4">
            Contact Messages
          </h2>
          <div className="overflow-y-auto max-h-[500px] border rounded">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-[#00ADB5] text-left text-base">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Subject</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {contactdata?.length > 0 ? (
                  contactdata?.map((contact, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2 border">{contact.name}</td>
                      <td className="p-2 border">{contact.email}</td>
                      <td className="p-2 border">{contact.subject}</td>
                      <td className="p-2 border">{contact.message}</td>
                      <td className="p-2 border">
                        {new Date(contact.createdAt).toLocaleString()}
                      </td>
                      <td className="p-2 border"><button
                        onClick={() => { handledelete(contact._id) }}
                        className="h-8 w-full cursor-pointer rounded-xl bg-red-400 hover:bg-red-500 text-white">Delete</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-400">
                      No contact messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

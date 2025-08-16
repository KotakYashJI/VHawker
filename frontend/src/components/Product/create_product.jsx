import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadLoginuser } from '../../actions/Useraction';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Addproduct } from '../../actions/Productaction';
import { nanoid } from '@reduxjs/toolkit';
//import { toast } from 'react-toastify';

const CreateProduct = () => {
  const [inputType, setInputType] = useState("url"); // "url" or "upload"
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginuser = useSelector((state) => state.user.Loginuser);
  const productfile = watch("productfile");
  const productimg = watch("productimg");

  const handleProduct = (product) => {
    product.id = nanoid();

    if (inputType === "upload") {
      product.productimg = URL.createObjectURL(productfile[0]);
    }
    dispatch(Addproduct(loginuser._id, product));
    navigate(`/${loginuser?.usertype}`);
    reset();
    setInputType("url");
  };

  useEffect(() => {
    dispatch(LoadLoginuser());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEEEEE] p-4">
      <form
        onSubmit={handleSubmit(handleProduct)}
        className="mt-[5%] w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-[#222831] text-3xl font-bold text-center">Create Product</h2>

        <div className="flex gap-6 justify-center">
          <label className="flex items-center gap-2 text-[#393E46] font-medium">
            <input
              type="radio"
              value="url"
              checked={inputType === "url"}
              onChange={() => setInputType("url")}
            />
            Image URL
          </label>
          <label className="flex items-center gap-2 text-[#393E46] font-medium">
            <input
              type="radio"
              value="upload"
              checked={inputType === "upload"}
              onChange={() => setInputType("upload")}
            />
            Upload File
          </label>
        </div>
        {inputType === "url" && (
          <div>
            <input
              type="text"
              placeholder="Enter Product Image URL"
              {...register("productimg")}
              className="w-full p-3 text-base rounded-lg border-2 border-[#00ADB5] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
            />
          </div>
        )}
        {inputType === "upload" && (
          <div className="w-full p-3 text-base rounded-lg border-2 border-[#00ADB5] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            <input
              type="file"
              accept="image/*"
              {...register("productfile")}
              className="w-full text-black"
            />
          </div>
        )}
        <div>
          <input
            type="text"
            placeholder="Enter Product Name"
            {...register("productname", { required: "Product name is required" })}
            className="w-full p-3 text-base rounded-lg border-2 border-[#00ADB5] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          />
          {errors.productname && <p className="text-red-500 text-sm mt-1">{errors.productname.message}</p>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter Product Price"
            {...register("productprice", { required: "Product price is required" })}
            className="w-full p-3 text-base rounded-lg border-2 border-[#00ADB5] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          />
          {errors.productprice && <p className="text-red-500 text-sm mt-1">{errors.productprice.message}</p>}
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter Product Quantity"
            {...register("productquantity", { required: "Product quantity is required" })}
            className="w-full p-3 text-base rounded-lg border-2 border-[#00ADB5] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          />
          {errors.productquantity && <p className="text-red-500 text-sm mt-1">{errors.productquantity.message}</p>}
        </div>
        <div>
          <textarea
            placeholder="Enter Description"
            {...register("description", { required: "Description is required" })}
            className="w-full p-3 text-base h-28 rounded-lg border-2 border-[#00ADB5] text-black placeholder-black resize-none focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#00ADB5] hover:bg-[#00bfcf] w-[40%] text-white px-6 py-3 rounded-lg text-lg font-semibold items-center cursor-pointer transition duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
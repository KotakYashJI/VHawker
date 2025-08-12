import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteproduct, singleproduct, UpdateProduct } from '../../actions/Productaction';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LoadLoginuser } from '../../actions/Useraction';

const SingleProduct = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { sellertype, sellerid, productId } = useParams()

   const product = useSelector((state) => state.product.singleproduct);
   const loginuser = useSelector((state) => state.user.Loginuser);

   const { register, handleSubmit, reset, formState: { errors } } = useForm();

   const handleproduct = (newproduct) => {
      dispatch(UpdateProduct(productId, loginuser, newproduct));
   }

   const handeldelete = (productid) => {
      dispatch(deleteproduct(productid, loginuser));
      navigate(`/${loginuser.usertype}`);
   }

   useEffect(() => {
      dispatch(singleproduct(productId, sellertype, sellerid));
      dispatch(LoadLoginuser());
   }, []);


   useEffect(() => {
      reset({
         productimg: product?.productimg,
         productname: product?.productname,
         productprice: product?.productprice,
         productquantity: product?.productquantity,
         description: product?.description,
      });
   }, [product, reset]);

   useEffect(() => {
   }, [sellertype, productId])

   return (
      <div className="min-h-screen w-full px-4 py-8 bg-[#f5f7fa] flex flex-col md:flex-row justify-center items-start gap-8">
         <div className="w-full h-130 md:w-[45%] max-w-xl mt-[6%] bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col">
            <div className="w-full h-60 mb-4 rounded-xl overflow-hidden">
               <img src={product?.productimg} alt="Product" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="text-gray-800 space-y-2 text-base">
               <p><span className="font-semibold">Product Name:</span> {product?.productname}</p>
               <p><span className="font-semibold">Price:</span> ₹{product?.productprice}</p>
               <p><span className="font-semibold">Quantity:</span> {product?.productquantity}</p>
               <p className="text-base text-gray-800">
                  {product?.description?.split(' ').length > 50 ? (
                     <div className="max-h-32 overflow-y-auto pr-2 custom-scroll text-base text-gray-800 mt-1">
                        <span className="font-semibold">Description:</span>
                        <p className="mt-1">{product?.description}</p>
                     </div>
                  ) : (
                     <p className="text-base text-gray-800">
                        <span className="font-semibold">Description:</span> {product?.description}
                     </p>
                  )}
               </p>
            </div>
         </div>
         <div className="w-full md:w-[45%] h-130 max-w-xl mt-[6%] relative bg-white border border-gray-200 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-center mb-4">{loginuser.usertype === "Wholesaler" && <span className='text-blue-400'>Edit Product</span>}</h2>
            <form onSubmit={handleSubmit(handleproduct)} className="h-110 space-y-4">
               <div>
                  <input
                     type="text"
                     disabled={loginuser._id !== product.buyerid}
                     placeholder="Product Image URL"
                     className="w-full h-12 text-xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                     {...register("productimg", { required: "Image is required" })}
                  />
                  {errors.productimg && <p className="text-red-500 text-sm mt-1">{errors.productimg.message}</p>}
               </div>
               <div>
                  <input
                     type="text"
                     disabled={loginuser._id !== product.buyerid}
                     placeholder="Product Name"
                     className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg text-xl focus:ring-2 focus:ring-blue-400 outline-none"
                     {...register("productname", { required: "Name is required" })}
                  />
                  {errors.productname && <p className="text-red-500 text-sm mt-1">{errors.productname.message}</p>}
               </div>
               <div>
                  <input
                     type="number"
                     disabled={loginuser._id !== product.buyerid}
                     placeholder="Product Price"
                     className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg text-xl focus:ring-2 focus:ring-blue-400 outline-none"
                     {...register("productprice", { required: "Price is required" })}
                  />
                  {errors.productprice && <p className="text-red-500 text-sm mt-1">{errors.productprice.message}</p>}
               </div>
               <div>
                  <input
                     type="number"
                     disabled={loginuser.usertype !== "Wholesaler"}
                     placeholder="Product Quantity"
                     className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg text-xl focus:ring-2 focus:ring-blue-400 outline-none"
                     {...register("productquantity", { required: "Quantity is required" })}
                  />
                  {errors.productquantity && <p className="text-red-500 text-sm mt-1">{errors.productquantity.message}</p>}
               </div>
               <div>
                  <textarea
                     rows={3}
                     disabled={loginuser._id !== product.buyerid}
                     placeholder="Description"
                     className="w-full h-30 px-4 py-2 border border-gray-300 rounded-lg text-xl resize-none focus:ring-2 focus:ring-blue-400 outline-none"
                     {...register("description", { required: "Description is required" })}
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
               </div>

               <button
                  type="submit"
                  className="w-1/2 py-2 text-white cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition duration-300"
               >
                  Update
               </button>

            </form>
            {loginuser.usertype === "Wholesaler" &&
               <button
                  onClick={() => { handeldelete(product.id) }}
                  className="w-[45%] py-2 absolute bottom-[2.5%] right-[3%] cursor-pointer text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition duration-300"
               >
                  Delete
               </button>
            }
         </div>
      </div>
   );
};

export default SingleProduct;
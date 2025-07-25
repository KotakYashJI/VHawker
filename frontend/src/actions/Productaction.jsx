import API from "../api";
import { LoadProducts, LoadSingleproduct } from "../slices/Productslice"
import { toast } from "react-toastify";
import { loadloginuser } from "../slices/Userslice";

export const Addproduct = (id, product) => async (dispatch) => {
    try {
        const crruser = await API.get(`/api/wholesalers/${id}`);
        const wholesaler = crruser.data.data;
        product.productquantity = Number(product.productquantity);
        product.productprice = Number(product.productprice);
        const updateproducts = [...wholesaler.products, product];
        const updatedwholesaler = {
            ...wholesaler,
            products: updateproducts
        };
        const res = await API.patch(`/api/wholesalers/${id}`, updatedwholesaler);
        const loginwholesaler = await API.get(`/api/wholesalers/${id}`);
        dispatch(loadloginuser(loginwholesaler.data.data));
        toast.success("Product Created!");
    } catch (error) {
        console.log(error);
    }
}

export const Loadproducts = () => async (dispatch) => {
    try {
        const res = await API.get("/api/products");
        console.log(res.data.data);
        dispatch(LoadProducts(res.data.data));
    } catch (error) {
        console.log(error);
    }
}

export const singleproduct = (productId) => async (dispatch) => {
    try {
        const singleproduct = await API.get(`http://localhost:8080/api/wholesalers/products/${productId}`);
        console.log(singleproduct);
        dispatch(LoadSingleproduct(singleproduct.data));
    } catch (error) {
        console.log(error);
    }
}

export const UpdateProduct = (id, loginuser, product) => async (dispatch) => {
    if (loginuser.usertype == "Wholesaler") {
        try {
            const wholesalerproduct = await API.patch(`/api/wholesalers/${loginuser._id}/products/${id}`, product);
            const singleproduct = await API.get(`/api/wholesalers/${loginuser._id}/products/${id}`);
            dispatch(LoadSingleproduct(singleproduct.data.data));
            toast.success("product updated");
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteproduct = (productid, loginuser) => async (dispatch) => {
    if (loginuser.usertype == "Wholesaler") {
        try {
            const wholesalerproduct = await API.delete(`/api/wholesalers/${loginuser._id}/products/${productid}`);
            const products = await API.get(`/api/wholesalers/${loginuser._id}/products`);
            dispatch(LoadProducts(products.data));
            toast.error("product deleted");
        } catch (error) {
            console.log(error);
        }
    }
}

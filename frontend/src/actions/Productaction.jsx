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
        const loginwholesaler = await API.patch(`/api/wholesalers/${id}`, updatedwholesaler);
        dispatch(loadloginuser(loginwholesaler.data.allproducts));
        toast.success("Product created successfully!");
    } catch (error) {
        toast.error(error.message);
    }
}

export const Loadproducts = () => async (dispatch) => {
    try {
        const res = await API.get("/api/products");
        dispatch(LoadProducts(res.data.data));
    } catch (error) {
        console.log(error);
    }
}

export const singleproduct = (productId, sellertype, sellerid) => async (dispatch) => {
    if (sellertype === "wholesaler") {
        try {
            const singleproduct = await API.get(`/api/wholesalers/${sellerid}/products/${productId}`);
            dispatch(LoadSingleproduct(singleproduct.data));
        } catch (error) {
            console.log(error);
        }
    }
    if (sellertype === "semiwholesaler") {
        try {
            const singleproduct = await API.get(`/api/semiwholesalers/${sellerid}/products/${productId}`);
            dispatch(LoadSingleproduct(singleproduct.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const UpdateProduct = (id, loginuser, product) => async (dispatch) => {
    const loginusertype = loginuser.usertype;

    if (loginusertype == "Wholesaler") {
        try {
            await API.patch(`/api/wholesalers/${loginuser._id}/products/${id}`, product);
            const singleproduct = await API.get(`/api/wholesalers/${loginuser._id}/products/${id}`);
            dispatch(LoadSingleproduct(singleproduct.data));
            toast.success("product updated");
        } catch (error) {
            console.log(error);
        }
    }
    if (loginusertype == "Semiwholesaler") {
        try {
            await API.patch(`/api/semiwholesalers/${loginuser._id}/products/${id}`, product);
            const singleproduct = await API.get(`/api/semiwholesalers/${loginuser._id}/products/${id}`);
            dispatch(LoadSingleproduct(singleproduct.data));
            toast.success("product updated");
        } catch (error) {
            console.log(error);
        }
    }
}

export const crruserproducts = (user) => async (dispatch) => {
    try {
        await dispatch(LoadProducts(user.products));
    } catch (error) {
        console.log(error);
    }
}

export const deleteproduct = (productid, loginuser) => async (dispatch) => {
    if (loginuser.usertype == "Wholesaler") {
        let wholesalerproduct;
        try {
            wholesalerproduct = await API.delete(`http://localhost:8080/api/wholesalers/${loginuser._id}/products/${productid}`);
            console.log(wholesalerproduct);
            dispatch(LoadProducts(wholesalerproduct.data.updatedwholesaler
            ));
            toast.error(wholesalerproduct.data.message);
        } catch (error) {
            console.log(error);
        }
    }
}
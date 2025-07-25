import API from "../api";
import { AddTocart, LoadCart, ClearCart } from "../slices/Cartslice";
import { toast } from "react-toastify";

export const addtocart = (buyerid, product, sellerid) => async (dispatch) => {
  try {
    const existcart = JSON.parse(localStorage.getItem("cart")) || [];

    if (existcart.length > 0) {
      const existsellerid = existcart[0].sellerid;
      if (existsellerid !== sellerid) {
        toast.error("You can only purchase from the same seller!");
        return;
      }
    }

    const existingIndex = existcart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex !== -1) {
      existcart[existingIndex].productquantity += 1;
    } else {
      existcart.push({
        ...product,
        buyerid,
        sellerid,
        productquantity: 1,
        productprice: Number(product.productprice),
      });
    }

    localStorage.setItem("cart", JSON.stringify(existcart));
    dispatch(AddTocart(existcart));
    toast.success("Product added to cart");
  } catch (error) {
    console.log("Add to cart error:", error);
    toast.error("Something went wrong while adding to cart");
  }
};

export const Updatecart = (cart) => (dispatch) => {
  try {
    dispatch(LoadCart(cart));
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.log(error);
  }
};

export const IncreaseQuantity = (index) => (dispatch) => {
  const cartproducts = JSON.parse(localStorage.getItem("cart"));
  const maxQty = cartproducts[index].maxquantity || 1;

  if (cartproducts[index].productquantity < maxQty) {
    cartproducts[index].productquantity += 1;
    localStorage.setItem("cart", JSON.stringify(cartproducts));
    dispatch(LoadCart(cartproducts));
  } else {
    toast.warning("Reached max quantity");
  }
};

export const DecreaseQuantity = (index) => (dispatch) => {
  const cartproducts = JSON.parse(localStorage.getItem("cart"));

  if (cartproducts[index].productquantity > 1) {
    cartproducts[index].productquantity -= 1;
  } else {
    cartproducts.splice(index, 1);
    toast.error("Product removed from cart");
  }

  localStorage.setItem("cart", JSON.stringify(cartproducts));
  dispatch(LoadCart(cartproducts));
};

export const removefromcart = (id) => (dispatch) => {
  try {
    const products = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedproducts = products.filter((pr) => pr.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedproducts));
    dispatch(LoadCart(updatedproducts));
    toast.error("Product removed from cart");
  } catch (error) {
    console.log("Remove from cart error:", error);
  }
};

export const LoadCartproducts = () => async (dispatch) => {
  try {
    const cartproducts = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartproducts.length === 0) {
      dispatch(LoadCart([]));
      return;
    }

    const res = await API.get("/api/wholesalers");
    const wholesalers = res.data || [];

    const updatedCart = cartproducts.map((cartItem) => {
      let matchedQty = null;

      wholesalers.forEach((wholesaler) => {
        const match = wholesaler.products.find((p) => p.id === cartItem.id);
        if (match) {
          matchedQty = match.productquantity;
        }
      });

      return {
        ...cartItem,
        maxquantity: matchedQty ?? cartItem.maxquantity ?? 1,
      };
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(LoadCart(updatedCart));
  } catch (error) {
    console.log("Load cart error:", error);
  }
};

export const paymentgateway = (loginuser, orderdata, paymentdetails) => async (dispatch) => {
  try {
    const { sellerId, sellertype } = orderdata;
    const buyerid = loginuser._id;
    const buyertype = loginuser.usertype.toLowerCase();

    await API.post("/api/orders", { orderdata, paymentdetails });
    await API.patch(`/api/wholesalers/${sellerId}/products`, orderdata);
    
    if (buyertype == "semiwholesaler") {
      await API.patch(`/api/semiwholesalers/${buyerid}/products`, orderdata);
    }

    localStorage.removeItem("cart");
    dispatch(ClearCart());
    toast.success("Payment successful. Order placed!");
  } catch (error) {
    console.log("Payment error:", error);
    toast.error("Payment failed");
  }
};
import API from "../api";
import { AddTocart, LoadCart, ClearCart } from "../slices/Cartslice";
import { toast } from "react-toastify";

export const addtocart = (buyerid, product, sellerId) => async (dispatch) => {
  try {
    const existcart = JSON.parse(localStorage.getItem(`${buyerid}cart`)) || [];

    if (existcart.length > 0) {
      const existsellerId = existcart[0].sellerId;
      if (existsellerId !== sellerId) {
        toast.error("You can only purchase from the same seller!");
        return;
      }
    }

    const existingIndex = existcart.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex !== -1) {
      if (existcart[existingIndex].productquantity < existcart[existingIndex].maxquantity) {
        existcart[existingIndex].productquantity += 1;
      } else {
        toast.warning("Reached max quantity");
        return;
      }
    } else {
      existcart.push({
        ...product,
        buyerid,
        sellerId,
        productquantity: 1,
        maxquantity: product.productquantity,
        productprice: Number(product.productprice),
      });
    }

    localStorage.setItem(`${buyerid}cart`, JSON.stringify(existcart));
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
    localStorage.setItem(`${buyerid}cart`, JSON.stringify(cart));
  } catch (error) {
    console.log(error);
  }
};

export const IncreaseQuantity = (index, buyerid) => (dispatch) => {
  const cartproducts = JSON.parse(localStorage.getItem(`${buyerid}cart`));
  const maxQty = cartproducts[index].maxquantity || 1;

  if (cartproducts[index].productquantity < maxQty) {
    cartproducts[index].productquantity += 1;
    localStorage.setItem(`${buyerid}cart`, JSON.stringify(cartproducts));
    dispatch(LoadCart(cartproducts));
  } else {
    toast.warning("Reached max quantity");
  }
};

export const DecreaseQuantity = (index, buyerid) => (dispatch) => {
  const cartproducts = JSON.parse(localStorage.getItem(`${buyerid}cart`));

  if (cartproducts[index].productquantity > 1) {
    cartproducts[index].productquantity -= 1;
  } else {
    cartproducts.splice(index, 1);
    toast.error("Product removed from cart");
  }

  localStorage.setItem(`${buyerid}cart`, JSON.stringify(cartproducts));
  dispatch(LoadCart(cartproducts));
};

export const LoadCartproducts = (buyerid) => async (dispatch) => {
  try {
    console.log(buyerid);
    
    const cartproducts = JSON.parse(localStorage.getItem(`${buyerid}cart`)) || [];

    if (cartproducts.length === 0) {
      dispatch(LoadCart([]));
      return;
    }

    const res = await API.get("http://localhost:8080/api/wholesalers");
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

    console.log(updatedCart);
    

    localStorage.setItem(`${buyerid}cart`, JSON.stringify(updatedCart));
    dispatch(LoadCart(updatedCart));
  } catch (error) {
    console.log("Load cart error:", error);
  }
};

export const paymentgateway = (loginuser, orderdata, paymentdetails) => async (dispatch) => {
  const date = orderdata.date;
  const updatedorder = orderdata.orderdata.map((order) => ({
    ...order,
    maxquantity: order.productquantity
  }));

  try {
    const { sellerId, sellertype } = updatedorder[0];

    const buyerId = loginuser._id;
    const buyertype = loginuser.usertype.toLowerCase();

    const sellerdata = {
      sellerId,
      sellertype
    }

    const buyerdata = {
      buyerId,
      buyertype
    }

    await API.post("/api/orders", { updatedorder, date, buyerdata, sellerdata, paymentdetails });

    if (sellertype.toLowerCase() === "semiwholesaler" && buyertype === "hawker") {
      const ans = await API.patch(`/api/semiwholesalers/${sellerId}/products`, { updatedorder, buyertype });
      console.log(ans);
    }

    if (sellertype.toLowerCase() == "wholesaler" && buyertype == "semiwholesaler") {
      const order = await API.patch(`/api/wholesalers/${sellerId}/products`, updatedorder);
      const ans = await API.patch(`/api/semiwholesalers/${buyerId}/products`, { buyertype, updatedorder });
      console.log(order);
      console.log(ans);
    }

    if (sellertype.toLowerCase() == "wholesaler" && buyertype == "hawker") {
      const order = await API.patch(`/api/wholesalers/${sellerId}/products`, updatedorder);
      console.log(order);
    }

    localStorage.removeItem(`${buyerId}cart`);
    dispatch(ClearCart());
    toast.success("Order placed!");

  } catch (error) {
    console.log("Payment error:", error);
    toast.error("Payment failed");
  }
};
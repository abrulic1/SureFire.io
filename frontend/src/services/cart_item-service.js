import { BE_URL } from "../utils/constants";
import { createCart, getCart } from "./cart-service";
import { getUserByAddress } from "./user-service";

export const addCartItem = async (user_id, product_id) => {
    const cart = await createCart(user_id);
    const request = {
        cart_id: cart._id,
        product_id: product_id,
        user_id: user_id
      };
      const res = await fetch(`${BE_URL}/cart_items/add-item`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
    const item = await res.json();
    return item;
}


export const getUserItems = async (user_address) => {
  const user = await getUserByAddress(user_address);
  const cart = await getCart(user._id); 
  const res = await fetch(`${BE_URL}/cart_items/get-user-items?cart_id=${encodeURIComponent(cart._id)}`);
  const items = await res.json();
  return items;
}


export const deleteCartItem = async (product_id, cart_id) => {
  try {
    const response = await fetch(`${BE_URL}/cart_items/delete-item?product_id=${encodeURIComponent(product_id)}&cart_id=${encodeURIComponent(cart_id)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
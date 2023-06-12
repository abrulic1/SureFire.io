import { BE_URL } from "../utils/constants";
import { createCart, getCart } from "./cart-service";
import { getUserByAddress } from "./user-service";

export const addCartItem = async (user_id, product_id) => {
    //provjera za cart 
    console.log("iz addCartItema user_id i product_id: ", user_id, "  ", product_id);
    const cart = await createCart(user_id);
    console.log("cart iz cart__item servisa je:  ", cart);
    const request = {
        cart_id: cart._id,
        product_id: product_id,
        user_id: user_id
      };
    console.log("ccccc: ", cart._id, " ");
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
  console.log("uslo je u getUserItems");
  const user = await getUserByAddress(user_address);
  const cart = await getCart(user._id); 
  const res = await fetch(`${BE_URL}/cart_items/get-user-items?cart_id=${encodeURIComponent(cart._id)}`);
  const items = await res.json();
  console.log("ITEMS:    ", items);
  return items;
}
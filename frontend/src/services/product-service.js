import { BE_URL } from "../utils/constants";
import { getCart } from "./cart-service";
import { deleteCartItem } from "./cart_item-service";
import { getUserByAddress } from "./user-service";

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${BE_URL}/products/`);
    console.log("Fetching products..");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByName = async (name) => {
  console.log("uslo je u getProductsByName");
  if (name == null)
    return null;
  try {
    const normalizedName = name.toUpperCase();
      const res = await fetch(`${BE_URL}/products/${encodeURIComponent(normalizedName)}`);
      console.log("Fetching products..");
    const data = await res.json();
    console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
}

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(
      `${BE_URL}/products/product/${encodeURIComponent(id)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const purchaseProductFromDB = async (product_id, user_address) => {
  try {
    const user = await getUserByAddress(user_address);
    const cart = await getCart(user._id);
    try {
      await deleteCartItem(product_id, cart._id);
    } catch (error) {
      console.log("errr", error);
    }
    const res = await fetch(`${BE_URL}/products/${encodeURIComponent(product_id)}/purchase?user_id=${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

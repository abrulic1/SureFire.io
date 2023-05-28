import { BE_URL } from "../utils/constants";
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


export const getProductsByOwnerAddress = async (address) => {
  try {
    const response = await fetch(
      `${BE_URL}/products/${encodeURIComponent(address)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const purchaseProduct = async (product_id, user_address) => {
  try {
    const user = await getUserByAddress(user_address);
    const res = await fetch(`${BE_URL}/products/${encodeURIComponent(product_id)}/purchase?user_id=${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    console.log("Purchase...");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

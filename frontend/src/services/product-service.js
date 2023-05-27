import { BE_URL } from "../utils/constants";
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

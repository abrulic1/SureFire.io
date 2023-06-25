import { BE_URL } from "../utils/constants";
import { fetchProductById } from "./product-service";
import { getUserByAddress } from "./user-service";

export const getOwner = async (product_id) => {
    try {
        const res = await fetch(
          `${BE_URL}/user_products/owner-of/${encodeURIComponent(product_id)}`
        );
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
}

export const getProducts = async (address) => {
  console.log("uslo je u getproducts");
  try {

    const user = await getUserByAddress(address);
    const response = await fetch(
      `${BE_URL}/user_products/products?user_id=${encodeURIComponent(user._id)}`
    );
    const data = await response.json();
    return data;
  }
 catch (error) {
    console.log(error);
  }
}

export const getProductsByOwnerAddress = async (address) => {
  console.log("Uslo je u getProducts BYOWNERaddress");
  try {
    const user = await getUserByAddress(address);
    const response = await fetch(
      `${BE_URL}/user_products/products-of?user_id=${encodeURIComponent(user._id)}`
    );
    const data = await response.json();
    const arrayOfProductIds = data[0].product_id;

    const onlyProducts = arrayOfProductIds.map(async (u) => {
      const product = await fetchProductById(u);
      return product;
    });


    const products = await Promise.all(onlyProducts);
    return products;
  } catch (error) {
    console.log(error);
  }
};




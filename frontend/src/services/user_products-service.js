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

export const getProductsByOwnerAddress = async (address) => {
  try {
    const user = await getUserByAddress(address);
    const response = await fetch(
      `${BE_URL}/user_products/products-of?user_id=${encodeURIComponent(user._id)}`
    );
    const data = await response.json();
    const arrayOfProductIds = data[0].product_id;
    console.log("PROIVODII ZA OWNERA: ", arrayOfProductIds);   //ovo je sad niz od product_id-eva

    const onlyProducts = arrayOfProductIds.map(async (u) => {
      const product = await fetchProductById(u);
      return product;
    });


    const products = await Promise.all(onlyProducts);
    console.log("Products: ", products);
    return products;
  } catch (error) {
    console.log(error);
  }
};




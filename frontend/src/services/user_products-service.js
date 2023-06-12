import { BE_URL } from "../utils/constants";

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

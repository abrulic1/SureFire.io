import { BE_URL } from "../utils/constants";

export const createCart = async (user_id) => {
    const res = await checkCart(user_id);
    //vraca mi null ako ne postoji cart za tog usera da bismo napravili onda
    if (res == null) 
    {
        try {
            const response = await fetch(`${BE_URL}/cart/create-cart?user_id=${encodeURIComponent(user_id)}`, {
              method: 'POST'
            })
            const cart = await response.json();
            return cart;
          }
          catch (error) {
            console.error(error);
          }
    }
    return res;
}



const checkCart = async (user_id) => {
    try {
        const res = await fetch(`${BE_URL}/cart/check-cart/${encodeURIComponent(user_id)}`);
        //////fffdff
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }

}


export const getCart = async (user_id) => {
  try {
    const response = await fetch(`${BE_URL}/cart/get-cart?user_id=${encodeURIComponent(user_id)}`);
        const cart = await response.json();
        return cart;
    } catch (error) {
        console.log(error);
      }
}
import { BE_URL } from "../utils/constants";

export const createCart = async (user_id) => {
    const res = await checkCart(user_id);
    console.log("ovdje iz createCart:  ", res);
    //vraca mi null ako ne postoji cart za tog usera da bismo napravili onda
    if (res == null) 
    {
        console.log("uslo je u ovaj if");
        try {
            console.log("uslo je u try");
            const response = await fetch(`${BE_URL}/cart/create-cart?user_id=${encodeURIComponent(user_id)}`, {
              method: 'POST'
            })
            console.log("da vidimo response ", response);
            const cart = await response.json();
            console.log("ovdje bi se nakon kreiranja sad trebala cart vratiti: ", cart);
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
        console.log("sa checkCart sa fronta je: ", user_id);
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
    console.log("user_iddddd: ", user_id);
    const response = await fetch(`${BE_URL}/cart/get-cart?user_id=${encodeURIComponent(user_id)}`);
    console.log("responsee: ", response);
        const cart = await response.json();
        return cart;
    } catch (error) {
        console.log(error);
      }
}
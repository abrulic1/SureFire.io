import { BE_URL } from "../utils/constants";

export const getUserByAddress = async (userAddress) => {
  try {
    console.log("uslo je u metodu getUserByAddress iz user-service.js");
    console.log("use raddreisia ", userAddress);
  
    const res = await fetch(
      `${BE_URL}/users/user?address=${encodeURIComponent(userAddress)}`
    );
    console.log("Getting user by userAddress...");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

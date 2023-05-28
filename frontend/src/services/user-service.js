import { BE_URL } from "../utils/constants";

export const getUserByAddress = async (userAddress) => {
  try {
    const res = await fetch(
      `${BE_URL}/users/user?address=${encodeURIComponent(userAddress)}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

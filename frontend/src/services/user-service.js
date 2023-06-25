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

export const getUserById = async (userId) => {
  console.log("userid: ", userId);
  try {
    const res = await fetch(
      `${BE_URL}/users/get-user/${encodeURIComponent(userId)}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const addUser = async (address) => {
  try {
    const res = fetch(`${BE_URL}/users/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address })
    })
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error(error);
  }
}

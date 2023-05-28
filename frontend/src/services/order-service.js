import { getUserByAddress } from "./user-service";
import { BE_URL } from "../utils/constants";

export const getOrderByUserId = async (userId) => {
  try {
    const response = await fetch(
      `${BE_URL}/orders/order/${encodeURIComponent(userId)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const makeOrder = async (userAddress, id) => {
  const user = await getUserByAddress(userAddress);
  //NOTE 1: The method on the backend uses 'find' method from the mongoose library, which returns an array, and since we only
  // have one user that will be returned, then we take the first element of that array(first user)
  //NOTE 2: It would be better approach to use 'findOne' or similar method to return only one user
  const orderData = {
    user: user._id,
    product: [id],
  };

  const hasOrder = await getOrderByUserId(user._id);
  if (!hasOrder) return addOrder(orderData);
  else return updateOrder(hasOrder._id, id);
};

export const getUserOrders = async (userAddress) => {
  const user = await getUserByAddress(userAddress);
  try {
    const response = await fetch(
      `${BE_URL}/orders/${encodeURIComponent(user._id)}/orders`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const addOrder = async (orderData) => {
  try {
    const res = await fetch(`${BE_URL}/orders/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (orderId, productId) => {
  try {
    const response = await fetch(`${BE_URL}/orders/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.Error || "Server error");
    }

    const updatedOrder = await response.json();
    return updatedOrder;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

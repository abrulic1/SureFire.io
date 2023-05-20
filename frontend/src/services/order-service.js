import { getUserByAddress } from "./user-service";

export const getOrderByUserId = async (userId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/orders/order/${encodeURIComponent(userId)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const addOrder = async (userAddress, id) => {
    const user = await getUserByAddress(userAddress);
    //NOTE 1: The method on the backend uses 'find' method from the mongoose library, which returns an array, and since we only
    // have one user that will be returned, then we take the first element of that array(first user)
    //NOTE 2: It would be better approach to use 'findOne' or similar method to return only one user
    const orderData = {
        user: user[0]._id,
        product: [id],
    };

    try {
        const res = await fetch(`http://localhost:5000/api/orders/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        console.log("Adding order..");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

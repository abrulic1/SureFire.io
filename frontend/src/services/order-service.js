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
    console.log("Uslo u addOrder iz user_order-service.js")
    const user = await getUserByAddress(userAddress);
    console.log("User je ovdje: ", user);
    const orderData = {
        user: user._id,
        product: id,
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

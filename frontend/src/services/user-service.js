 export const getUserByAddress = async (userAddress) => {
    try {
        console.log("uslo je u metodu getUserByAddress iz user-service.js")
        const res = await fetch(`http://localhost:5000/api/users/user?address=${encodeURIComponent(userAddress)}`);
        console.log("Getting user by userAddress...");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

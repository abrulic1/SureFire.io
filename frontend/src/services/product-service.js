export const fetchProducts = async () => {
    try {
        const res = await fetch(`http://localhost:5000/api/products/`);
        console.log("Fetching products..");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
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


export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/products/product/${encodeURIComponent(id)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
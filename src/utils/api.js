const API_URL = "https://fakestoreapi.com/products"

export const fetchProductByText = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};
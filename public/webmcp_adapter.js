console.log('WebMCP Adapter Initialized');

if (!window.modelContext) {
    window.modelContext = {};
}
if (!window.modelContext.agent) {
    window.modelContext.agent = {};
}
if (!window.modelContext.agent.tools) {
    window.modelContext.agent.tools = {};
}

// Base URL for the API server
const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Retrieves a list of all available products from the store.
 * @returns {Array<Object>} An array of product objects, each with properties like id, name, price, description, and imageUrl.
 */
window.modelContext.agent.tools.getProducts = async () => {
    try {
        console.log('WebMCP: Calling getProducts...');
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        console.log('WebMCP: Fetched products successfully:', products);
        return products;
    } catch (error) {
        console.error('WebMCP: Error fetching products:', error);
        throw error;
    }
};

/**
 * Adds a specified quantity of a product to the shopping cart.
 * Note: The backend for this application simulates adding to cart and does not maintain a persistent cart state.
 * It will always report success if the request format is correct.
 * @param {number|string} productId The unique identifier of the product to add.
 * @param {number} quantity The number of units of the product to add. Must be a positive integer.
 * @returns {Object} An object indicating the success of the operation, e.g., `{ success: true, message: "Added to cart" }`.
 */
window.modelContext.agent.tools.addToCart = async (productId, quantity) => {
    if (typeof productId !== 'number' && typeof productId !== 'string') {
        throw new Error('WebMCP: addToCart expects productId to be a number or string.');
    }
    if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
        throw new Error('WebMCP: addToCart expects quantity to be a positive integer.');
    }

    try {
        console.log(`WebMCP: Calling addToCart for productId: ${productId}, quantity: ${quantity}...`);
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(`WebMCP: Added product ${productId} (Qty: ${quantity}) to cart successfully.`, result);
        return result;
    } catch (error) {
        console.error(`WebMCP: Error adding product ${productId} to cart:`, error);
        throw error;
    }
};
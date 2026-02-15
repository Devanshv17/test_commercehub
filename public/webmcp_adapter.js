console.log('WebMCP Adapter Initialized');

// Ensure window.modelContext and its nested properties exist safely
window.modelContext = window.modelContext || {};
window.modelContext.agent = window.modelContext.agent || {};
window.modelContext.agent.tools = window.modelContext.agent.tools || {};

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetches all available products from the store.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 *                                   Each product object typically contains: { id, name, price, description, imageUrl }.
 */
window.modelContext.agent.tools.getProducts = async () => {
    try {
        console.log('WebMCP Adapter: Attempting to fetch products...');
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const products = await response.json();
        console.log('WebMCP Adapter: Successfully fetched products:', products);
        return products;
    } catch (error) {
        console.error('WebMCP Adapter: Error in getProducts:', error);
        throw error; // Re-throw the error for the agent to handle
    }
};

/**
 * Adds a specified product to the shopping cart.
 * @param {number} productId The ID of the product to add to the cart.
 * @param {number} [quantity=1] The number of units of the product to add. Defaults to 1.
 * @returns {Promise<Object>} A promise that resolves to a confirmation object, e.g., { success: true, message: 'Added to cart' }.
 */
window.modelContext.agent.tools.addToCart = async (productId, quantity = 1) => {
    if (typeof productId !== 'number' || productId <= 0) {
        throw new Error('Invalid productId: Must be a positive number.');
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
        throw new Error('Invalid quantity: Must be a positive number.');
    }

    try {
        console.log(`WebMCP Adapter: Attempting to add product ${productId} (quantity: ${quantity}) to cart...`);
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        console.log('WebMCP Adapter: Successfully added to cart:', result);
        return result;
    } catch (error) {
        console.error('WebMCP Adapter: Error in addToCart:', error);
        throw error; // Re-throw the error for the agent to handle
    }
};
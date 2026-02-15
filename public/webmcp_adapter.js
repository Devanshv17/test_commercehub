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

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Retrieves a list of all available products.
 * @returns {Promise<Array<{id: number, name: string, price: number, description: string, imageUrl: string}>>} A promise that resolves to an array of product objects.
 * @example
 * await window.modelContext.agent.tools.getProducts();
 */
window.modelContext.agent.tools.getProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        console.log('Fetched products:', products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

/**
 * Adds a specified quantity of a product to the cart.
 * @param {number} productId The ID of the product to add to the cart.
 * @param {number} quantity The quantity of the product to add.
 * @returns {Promise<{success: boolean, message: string}>} A promise that resolves to an object indicating success and a message.
 * @example
 * await window.modelContext.agent.tools.addToCart(1, 2); // Adds 2 of product with ID 1 to cart
 */
window.modelContext.agent.tools.addToCart = async (productId, quantity) => {
    try {
        if (typeof productId !== 'number' || productId <= 0) {
            throw new Error('Invalid productId: Must be a positive number.');
        }
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Invalid quantity: Must be a positive number.');
        }

        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(`Added product ${productId} (Qty: ${quantity}) to cart.`, result);
        return result;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

console.log('WebMCP Tools exposed:', Object.keys(window.modelContext.agent.tools));
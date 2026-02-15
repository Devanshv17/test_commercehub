console.log('WebMCP Adapter Initialized');

// Define the window.modelContext object as required
window.modelContext = {
    agent: {
        tools: {
            // Tools will be defined here
        }
    }
};

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Tool: getProducts
 * Description: Retrieves a list of all available products from the store.
 * Returns: A Promise that resolves to an array of product objects, or rejects with an error.
 * Each product object typically includes: id, name, price, description, imageUrl.
 * Example Usage: await window.modelContext.agent.tools.getProducts();
 */
window.modelContext.agent.tools.getProducts = async () => {
    console.log('WebMCP Tool: getProducts called.');
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const products = await response.json();
        console.log('WebMCP Tool: getProducts success.', products);
        return products;
    } catch (error) {
        console.error('WebMCP Tool: getProducts error.', error);
        throw error;
    }
};

/**
 * Tool: addToCart
 * Description: Adds a specified quantity of a product to the shopping cart.
 * Parameters:
 *   - productId (number): The unique identifier of the product to add.
 *   - quantity (number): The number of items to add. Must be a positive integer.
 * Returns: A Promise that resolves to a success object (e.g., { success: true, message: 'Added to cart' }), or rejects with an error.
 * Example Usage: await window.modelContext.agent.tools.addToCart(1, 2); // Adds 2 units of product with ID 1 to the cart
 */
window.modelContext.agent.tools.addToCart = async (productId, quantity) => {
    console.log(`WebMCP Tool: addToCart called with productId=${productId}, quantity=${quantity}.`);

    // Basic input validation
    if (typeof productId !== 'number' && typeof productId !== 'string') {
        throw new Error('productId must be a number or string.');
    }
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1) {
        throw new Error('quantity must be a positive integer.');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: Number(productId), quantity }), // Ensure productId is a number for the backend
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to add product to cart: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const result = await response.json();
        console.log('WebMCP Tool: addToCart success.', result);
        return result;
    } catch (error) {
        console.error('WebMCP Tool: addToCart error.', error);
        throw error;
    }
};
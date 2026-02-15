console.log('WebMCP Adapter Initialized');

window.modelContext = {
    agent: {
        tools: {
            /**
             * Fetches a list of all available products from the store.
             * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
             * Each product object has properties like `id`, `name`, `price`, `description`, `imageUrl`.
             */
            getProducts: async function() {
                try {
                    const response = await fetch('/api/products');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const products = await response.json();
                    return products;
                } catch (error) {
                    console.error('Error fetching products:', error);
                    throw error;
                }
            },

            /**
             * Adds a specified quantity of a product to the shopping cart.
             * Note: The current backend implementation logs the action but doesn't persist cart items.
             * @param {number} productId The ID of the product to add to the cart.
             * @param {number} quantity The quantity of the product to add.
             * @returns {Promise<Object>} A promise that resolves to an object indicating success.
             */
            addToCart: async function(productId, quantity) {
                try {
                    const response = await fetch('/api/cart', {
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
                    return result;
                } catch (error) {
                    console.error('Error adding to cart:', error);
                    throw error;
                }
            }
        }
    }
};
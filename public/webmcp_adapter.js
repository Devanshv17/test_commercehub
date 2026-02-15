console.log('WebMCP Adapter Initialized');

window.modelContext = {
    agent: {
        tools: {
            /**
             * Fetches a list of all available products from the store.
             * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
             */
            getProducts: async function() {
                try {
                    const response = await fetch('http://localhost:3001/api/products');
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
             * @param {string} productId The ID of the product to add to the cart.
             * @param {number} quantity The quantity of the product to add.
             * @returns {Promise<Object>} A promise that resolves to the API response, typically indicating success.
             */
            addToCart: async function(productId, quantity = 1) {
                try {
                    const response = await fetch('http://localhost:3001/api/cart', {
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
                    console.log(`Added product ${productId} (Qty: ${quantity}) to cart. API Response:`, result);
                    return result;
                } catch (error) {
                    console.error(`Error adding product ${productId} to cart:`, error);
                    throw error;
                }
            }
        }
    }
};
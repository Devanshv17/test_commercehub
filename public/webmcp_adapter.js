console.log('WebMCP Adapter Initialized');

window.modelContext = {
    agent: {
        tools: {
            /**
             * Fetches all available products from the store.
             * @returns {Promise<Array<Object>|Object>} A promise that resolves to an array of product objects or an error object.
             */
            getProducts: async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/products');
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const products = await response.json();
                    return products;
                } catch (error) {
                    console.error('Error fetching products:', error);
                    return { error: error.message, status: 'failed' };
                }
            },

            /**
             * Adds a specified quantity of a product to the shopping cart.
             * @param {number} productId The ID of the product to add.
             * @param {number} [quantity=1] The quantity of the product to add. Defaults to 1.
             * @returns {Promise<Object>} A promise that resolves to a success message or an error object.
             */
            addProductToCart: async (productId, quantity = 1) => {
                if (typeof productId !== 'number' || productId <= 0) {
                    return { error: 'Invalid productId. Must be a positive number.', status: 'failed' };
                }
                if (typeof quantity !== 'number' || quantity <= 0) {
                    return { error: 'Invalid quantity. Must be a positive number.', status: 'failed' };
                }

                try {
                    const response = await fetch('http://localhost:3001/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ productId, quantity })
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const result = await response.json();
                    return { ...result, status: 'success' };
                } catch (error) {
                    console.error(`Error adding product ${productId} to cart:`, error);
                    return { error: error.message, status: 'failed' };
                }
            }
        }
    }
};
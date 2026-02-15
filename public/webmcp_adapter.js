console.log('WebMCP Adapter Initialized');

window.modelContext = {
    agent: {
        tools: {
            /**
             * Retrieves a list of all available products from the store.
             * @returns {Promise<Array<{
             *   id: number,
             *   name: string,
             *   price: number,
             *   description: string,
             *   imageUrl: string
             * }>>} A promise that resolves to an array of product objects.
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
             * @param {number} productId The ID of the product to add.
             * @param {number} [quantity=1] The quantity of the product to add. Defaults to 1.
             * @returns {Promise<{ success: boolean, message: string }>} A promise that resolves to an object indicating success.
             */
            addToCart: async function(productId, quantity = 1) {
                if (typeof productId !== 'number' || productId <= 0) {
                    throw new Error('Invalid productId provided. Must be a positive number.');
                }
                if (typeof quantity !== 'number' || quantity <= 0) {
                    throw new Error('Invalid quantity provided. Must be a positive number.');
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
                        const errorData = await response.json();
                        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
                    }
                    const result = await response.json();
                    return result;
                } catch (error) {
                    console.error(`Error adding product ${productId} to cart:`, error);
                    throw error;
                }
            }
        }
    }
};
console.log('WebMCP Adapter Initialized (Fallback)');
window.modelContext = {
    agent: {
        tools: {
            getProducts: async () => {
                const res = await fetch('/api/products');
                return await res.json();
            },
            addToCart: async ({ productId, quantity }) => {
                const res = await fetch('/api/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, quantity })
                });
                return await res.json();
            }
        }
    }
};
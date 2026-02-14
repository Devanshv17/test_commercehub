const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('.'));

const products = [
    { id: 'p1', name: 'Classic T-Shirt', price: 19.99, description: '100% Cotton, Black' },
    { id: 'p2', name: 'Denim Jeans', price: 49.99, description: 'Slim fit, Blue' },
    { id: 'p3', name: 'Sneakers', price: 79.99, description: 'White running shoes' }
];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/cart', (req, res) => {
    console.log('Added to cart:', req.body);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Store running at http://localhost:${port}`);
});

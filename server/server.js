const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure database directory exists
const dbDir = path.join(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

// Database Setup (SQLite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(dbDir, 'store.sqlite'),
    logging: false
});

// Models
const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING }
});

const CartItem = sequelize.define('CartItem', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
});

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

// Seed Data
const seedData = async () => {
    await sequelize.sync({ force: true });

    await Product.bulkCreate([
        { name: 'Neon Cyber-Jacket', price: 199.99, description: 'Glow in the dark, waterproof.', imageUrl: 'https://placehold.co/150x150/000000/00FF00?text=Jacket' },
        { name: 'Holographic Sneakers', price: 129.50, description: 'Shift colors with every step.', imageUrl: 'https://placehold.co/150x150/000000/00FFFF?text=Sneakers' },
        { name: 'Neural Link Headset', price: 499.00, description: 'Direct brain-computer interface (Beta).', imageUrl: 'https://placehold.co/150x150/000000/FF00FF?text=Headset' }
    ]);

    console.log('Database seeded with Cyberpunk gear!');
};

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/cart', async (req, res) => {
    const { productId, quantity } = req.body;
    console.log(`Added product ${productId} (Qty: ${quantity}) to cart.`);
    res.json({ success: true, message: 'Added to cart' });
});

// Start Server
app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    try {
        await seedData();
    } catch (e) {
        console.error('Failed to sync DB:', e);
    }
});

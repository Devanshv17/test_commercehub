import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to fetch products:", err));
    }, [])

    const addToCart = (productId) => {
        fetch('http://localhost:3001/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        })
            .then(res => res.json())
            .then(data => {
                alert('Added to cart!');
                setCart([...cart, productId]);
            });
    }

    return (
        <div className="App">
            <h1>Halo Commerce (React)</h1>
            <div className="product-list">
                {products.map(p => (
                    <div key={p.id} className="product-card">
                        <img src={p.imageUrl} alt={p.name} width="100" />
                        <h3>{p.name}</h3>
                        <p>${p.price}</p>
                        <p>{p.description}</p>
                        <button onClick={() => addToCart(p.id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App

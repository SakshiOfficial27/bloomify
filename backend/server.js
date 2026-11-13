const express = require('express');
const cors = require('cors');

const app = express();

// CORS middleware
// CORS middleware
app.use(cors({
    origin: [
        'http://127.0.0.1:5500',
        'http://localhost:5500',
        'https://bloomify-frontend.vercel.app'
    ],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// Middleware to read JSON
app.use(express.json());

// Temporary product data
let products = [
    { id: 1, name: "Pink Roses", price: 499 },
    { id: 2, name: "Sunflowers", price: 399 },
    { id: 3, name: "Purple Flowers", price: 599 }
];

// API 1: Welcome message
app.get('/api/message', (req, res) => {
    res.json({
        message: "Welcome to Bloomify!"
    });
});

// API 2: Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API 3: Get one product
app.get('/api/products/:id', (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// API 4: Add a new product
app.post('/api/products', (req, res) => {

    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// API 5: Delete a product
app.delete('/api/products/:id', (req, res) => {

    const id = Number(req.params.id);

    const initialLength = products.length;

    products = products.filter(p => p.id !== id);

    if (products.length === initialLength) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json({
        message: "Product deleted successfully"
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bloomify server running on port ${PORT}`);
});

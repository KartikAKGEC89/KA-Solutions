const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')
const  connectDB = require('./config/db')
dotenv.config()
const app = express();

connectDB()

app.get('/', (req, res) => {
    res.send("API running")
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})
const PORT = process.env.PORT
 console.log(PORT)
app.listen(PORT, console.log("Running on particular port ....."))
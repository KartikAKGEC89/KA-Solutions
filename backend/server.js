const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
dotenv.config()
const app = express();

connectDB()

app.get('/', (req, res) => {
    res.send("API running")
})

app.use('/api/product', productRoutes);

const PORT = process.env.PORT
 console.log(PORT)
app.listen(PORT, console.log("Running on particular port ....."))
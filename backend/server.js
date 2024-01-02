const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
dotenv.config()
const app = express();
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

connectDB()

app.get('/', (req, res) => {
    res.send("API running")
})

app.use(express.json())

app.use('/api/product', productRoutes);

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT
console.log(PORT)
app.listen(PORT, console.log("Running on particular port ....."))
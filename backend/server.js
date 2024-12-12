const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoute = require ('./routes/uploadRoutes.js')
dotenv.config()
const app = express();

const cors = require('cors')


app.use(cors())

const {notFound, errorHandler} = require('./middleware/errorMiddleware')

connectDB()

app.get('/', (req, res) => {
    res.send("API running")
})

const _dirname = path.resolve()
app.use('/uploads', express.static(path.join(_dirname, '/uploads')))

app.use(express.json())

app.use('/api/product', productRoutes);

app.use('/api/user', userRoutes);

app.use('/api/upload', uploadRoute);

app.use('/', orderRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT
console.log(PORT)
app.listen(PORT, console.log("Running on particular port ....."))
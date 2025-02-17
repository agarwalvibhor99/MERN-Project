require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")


//My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")

// Database Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch(() =>{                             //CHECK THIS
    console.log("DB NOT CONNECTED")
})


// Middleware
app.use(bodyParser.json())
app.use(cookieParser())         //Create, put and delete cookies from browser
app.use(cors())

//ROUTES
app.use("/api", authRoutes)     //authRoutes refer to signup, signin, logout
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)


//PORT
const port = process.env.PORT || 8000

//SERVER START
app.listen(port, () => {
    console.log(`App is running at ${port}`)
});
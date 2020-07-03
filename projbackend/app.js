require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRoutes = require("./routes/auth")

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

//PORT
const port = process.env.PORT || 8000

//SERVER START
app.listen(port, () => {
    console.log(`App is running at ${port}`)
});
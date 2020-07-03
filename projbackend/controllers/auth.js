const User = require("../models/user")
const { check, validationResult } = require('express-validator');
var jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")

exports.signup = (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            errorMsg: errors.array()[0].msg,            //Use param to add parameter
            errorParam: errors.array()[0].param
        })
    }

    const user = new User(req.body) //Created a new instance of User in database with req.body is the inputed data by user in json format
    user.save((err, user) => {
        if(err){
            return res.status(400).json({       //json send for front end to parse
                err: "Cannot save user in Databse"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })        //err, user passed in databases when created also in firbase 
}

exports.signin = (req, res) => {
    const errors = validationResult(req)
    const { email, password } = req.body

    if(!errors.isEmpty()){
        return res.status(422).json({
            errorMsg: errors.array()[0].msg,            //Use param to add parameter
            errorParam: errors.array()[0].param
        })
    }

    User.findOne({ email }, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User doesn't exist, please signup first"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Incorrect email and password combination"
            })
        }
        
        //Creating a token 
        const token = jwt.sign({_id: user._id}, process.env.SECRET)

        //Put the token to the user cookie
        res.cookie("token", token, {expire: new Date() + 9999})

        //send response for frontend
        const {_id, name, email, rol} = user
        return res.json({token, user: {_id, name, email}})                  //Error role isn't defined
    })


}


//Use Bearer token

exports.signout = (req, res) => {   
    res.clearCookie("token")       //By CookieParses
    
    res.json({
        message: "Sign Out Success"
    })
}


//Protected Routes Middleware
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"                //Not using next as jwt already taken care of it
})

// Custom Middlewares
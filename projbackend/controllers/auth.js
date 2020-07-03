const User = require("../models/user")


exports.signup = (req, res) => {
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


exports.signout = (req, res) => {
    res.json({
        message: "Sign Out Success"
    })
}

const User = require("../models/user")


//Methods

//Middleware
exports.getUserByID = (req, res, next, id) => {
    User.findById(id).exec( (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user found in DataBase"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    //To hide the salt and encrypted password
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}

exports.getAllUser = (req, res) => {
    User.find().exec((err, users) => {
         if(err || !users){
             return res.status(400).json({
                 error: "No User Found"
             })
         }
         res.json(users)
    })
}
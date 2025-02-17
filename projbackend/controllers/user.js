const User = require("../models/user")
const Order = require("../models/order")

//Methods

//Middleware
exports.getUserById = (req, res, next, id) => {
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

exports.updateUser = (req, res) => {

    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindandModify: false},
        (err, user) => {
            if(err){
                return res.tatus(400).json({
                    error: "You are not authorized to update the user"
                })
            }
            user.salt = undefined
            user.encry_password = undefined;
            res.json(user);
        }
    )
}

exports.userOrderList = (req, res) => {
    Order.find({user: req.profile._id}).populate("user", "_id name").exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No order for this User"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {

    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    //store this in Database
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unabale to save purcahse list"
                })
            }
            next()
        }
    )
}

// exports.getAllUser = (req, res) => {
//     User.find().exec((err, users) => {
//          if(err || !users){   
//              return res.status(400).json({
//                  error: "No User Found"
//              })
//          }
//          res.json(users)
//     })
// }
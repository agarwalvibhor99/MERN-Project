const express = require("express")
const router = express.Router()

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { updateStock } = require("../controllers/product")

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateOrderStatus } = require("../controllers/order")

//Param: Parameter Extractor

router.param("userId", getUserById)
router.param("orderId", getOrderById)



//Routes
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder)        //To make createOrder is created only after stock and everything else updated 

router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

//status routes
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/:serId", isSignedIn, isAuthenticated, isAdmin, updateOrderStatus)


module.exports = router
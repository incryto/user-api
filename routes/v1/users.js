
const express = require("express");
const { validateToken } = require("./middlewares/token");
const { getCreatedBuckets, getOrders, addCurrentPrice, getUserDetails } = require("./middlewares/user");
var router = express.Router();


router.get('/details',validateToken,getOrders,addCurrentPrice,getUserDetails,(req,res)=>{
    req.user_details.purchases = req.orders
    req.user_details.current_price = req.net_price
    res.status(200).json({
        "response_code":"200",
        "message":"successfully fetched",
        "response":req.user_details
    })
})

router.get('/orders',validateToken,getOrders,addCurrentPrice,(req,res)=>{
    res.status(200).json({    
        "response_code":"200",
        "message":"successfully fetched",
        "response":req.orders
    })
})

router.get('/buckets/created',validateToken,getCreatedBuckets,(req,res)=>{
    res.status(200).json({
        "response_code":"200",
        "message":"successfully fetched",
        "response":req.created_buckets
    })
})


module.exports = router;

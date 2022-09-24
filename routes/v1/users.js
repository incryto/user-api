
const express = require("express");
const { validateToken } = require("./middlewares/token");
const { getCreatedBuckets, getOrders, addCurrentPrice } = require("./middlewares/user");
var router = express.Router();


router.get('/details',validateToken,)

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

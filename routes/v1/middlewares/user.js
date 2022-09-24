const purchase = require('../model/purchase')
const bucket = require("../model/bucket");
const { getCurrentPrice } = require('../controllers/bucket');

function getUser(req, res, next) {}

function getCreatedBuckets(req, res, next) {
  try {
    bucket.find({ creator_id: req.user_id }, (err, reply) => {
      if (err) {
        throw "error while fetching created buckets";
      }
      req.created_buckets = reply;
      next();
    });
  } catch (e) {
    res.status(200).json({
      response_code: 500,
      message: "Internal Server Error",
      response: null,
    });
  }
}


function getOrders(req,res,next){
    try{
        purchase.find({user_id:req.user_id }).populate("bucket_id").then((reply)=>{
            req.orders = reply
            next()
        })
    }catch(e){
        res.status(200).json({
            response_code: 500,
            message: "Internal Server Error",
            response: null,
          });
    }
}

async function addCurrentPrice(req,res,next){
    try{
        var orders  = req.orders
        var all_coin_list = []
        for(var i =0;i<orders.length;i++){
          all_coin_list.push.apply(all_coin_list, orders[i].bucket_id.coins)
        }
        const coins_set = new Set(all_coin_list)
        all_coin_list =Array.from(coins_set)
        var coins_list = await getCurrentPrice(all_coin_list)
        for(var i=0;i<orders.length;i++){
          var tot =0;
          for(var j =0;j<orders[i].bucket_id.coins.length;j++){
            
            for(var k = 0;k<coins_list.length;k++){
              if(orders[i].bucket_id.coins[j].id ==coins_list[k].id){
                tot+=coins_list[k].current_price*orders[i].bucket_id.coins[j].quantity;
                console.log(tot)
              }
            }
            
          }
          orders[i].bucket_id["current_price"] = tot
          
        }
        req.orders = orders

        next()
    }catch(e){
        res.status(200).json({
            response_code: 500,
            message: "Internal Server Error",
            response: null,
          });
    }
}
module.exports = {
  getCreatedBuckets,
  getOrders,
  addCurrentPrice
};

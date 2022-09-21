const purchase = require('../model/purchase')
const bucket = require("../model/bucket");

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
        purchase.find({user_id:req.user_id },(err,reply)=>{
            if(err){
                throw "Error while fetching orders"
            }
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
module.exports = {
  getCreatedBuckets,
  getOrders
};

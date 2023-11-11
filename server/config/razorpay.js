const Razorpay = require("razorpay"); 
exports.instance = new Razorpay({
 key_id:process.env.RAZOR_KEY,
key_secret:process.env.RAZOR_SECRET
})
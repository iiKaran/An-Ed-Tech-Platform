// Import the required modules
const express = require("express")
const router = express.Router()

const {verifySignature,capturePaymemt} = require("../controllers/Payment"); 

 router.post("/capturePayment",capturePaymemt); 
 router.post("/verifySignature",verifySignature);


module.exports = router
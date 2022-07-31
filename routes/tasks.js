const express = require("express");
const upload = require('../middleware/upload')
const router = express.Router();

const {
  checkAccount,verifyOTP,bookComplaint,getComplaints,addProduct,getProduct,goToHome
 ,getAllComplaints
  
} = require("../controllers/register");

router.route("/checkAccount").post(checkAccount)

router.route("/verifyOTP").post(verifyOTP);

router.route("/bookComplaint").post(bookComplaint);

router.route("/addProduct").post(addProduct);

router.route("/getProduct").post(getProduct);

router.route("/getComplaints").get(getComplaints)

router.route("/goToHome").get(goToHome);

router.route("/getAllComplaints").get(getAllComplaints);

module.exports = router;


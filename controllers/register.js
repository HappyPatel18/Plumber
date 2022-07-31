const _ = require('lodash');
const axios = require('axios');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt')
const Product = require("../model/product");
const Register = require("../model/register");
const Complaint = require("../model/complaint");

const Otp = require("../model/otp");

const asyncWrapper = require('../middleware/asyncWrapper');

const CLIENT_ID = '861241508731-22k90rth12vba42nfl0844dr3dllrf80.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04tQfS3L1jtJrCgYIARAAGAQSNwF-L9IrMcKdTCnp6YTQZh9bF9vzXZHuQWh4C711UOCdBhdPBNcfHGUMMN5VakKVmVCvXeZYzLc';


const checkAccount = asyncWrapper(async (req, res) => {
  number = req.body.number;
 const data = await Register.findOne({number: req.body.number });
 if(!data){
     const user = await Register.create(req.body);
     req.session.userid = user['_id'];
    }
    if(!req.session.userid){
      req.session.userid = data['_id'];
    }

    const result = generateOTP();
      if(result){
          res.render("otp",{number:req.body.number});
      }else{
        res.send('Failed')
      }
})

const generateOTP = async()=>{
  const OTP = otpGenerator.generate(6,{
    digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
  })
  console.log(OTP);
  const otp = new Otp({number:number,otp:OTP})
  const salt = await bcrypt.genSalt(10);
  otp.otp =  await bcrypt.hash(otp.otp,salt);
  const result  = await otp.save();
  return result;
}

const verifyOTP = asyncWrapper(async (req, res) => {

    const otpHolder = await Otp.find({number:req.body.number});

    if(otpHolder.length===0) return res.status(400).send("You use an Expired OTP!")

    const rightOtpFind = otpHolder[otpHolder.length-1];
    const validUser = await bcrypt.compare(req.body.otp,rightOtpFind.otp);

    if(rightOtpFind.number.toString()===req.body.number /* && validUser*/){
      const OTPDelete = await Otp.deleteMany({
        number:rightOtpFind.number
      })
      const data = await Product.find({});
      return res.render("home",{records:data})
    }
    else{
      return res.status(400).send("Your OTP Was wrong")
    }

})

  const bookComplaint = asyncWrapper(async (req, res) => {
      const DATA = new Complaint({
        product : req.body.product,
        userid  : req.session.userid,
        warranty  : req.body.warranty,
        issue : req.body.issue,
        timeslot : req.body.timeslot,
        address : req.body.address
      })
      console.log(DATA);
    const data = await Complaint.create(DATA);
    const products = await Product.find({});
    req.flash('message','Complaint placed Successfully');
    res.render("home", {message: req.flash('message'),records:products });

    });


  const getProduct = asyncWrapper(async (req, res) => {
    console.log(req.body)
    
  });

  const getComplaints = asyncWrapper(async (req, res) => {
    const task = await Complaint.find({userid:req.session.userid});
    res.render('complaints',{records:task});    
  });


  const addProduct =asyncWrapper(async (req, res) => {
    const task =  await Product.create(req.body);
      if(task){
          res.send("Product added successfully")
      } else{
        res.send("Product Not Added")

      }   
  });


  const goToHome = asyncWrapper(async (req, res) => {
    const data = await Product.find({});
      return res.render("home",{records:data})
  
  });

  const getAllComplaints = asyncWrapper(async (req, res) => {
    const task = await Complaint.find({});
    res.json(task);    
  });

  



module.exports = {
   checkAccount,verifyOTP,bookComplaint,getProduct,addProduct,getComplaints,goToHome,getAllComplaints
  };

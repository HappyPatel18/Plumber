const Admin = require("../model/admin");
const Register = require("../model/register")
const Complaint = require("../model/complaint")

const asyncWrapper = require('../middleware/asyncWrapper');
const bcrypt = require('bcryptjs')

const addAdmin = asyncWrapper(async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const tasks = await Admin.findOne({email: email });

  if(!tasks){
    req.body.password = await bcrypt.hash(req.body.password,12);
    const registerAdmin = await Admin.create(req.body);
    session=req.session;
    session.userId = registerAdmin['_id'];
    res.send("Admin Created")
  }
  else{
    // req.flash('message','Admin Already not Exist')
    // res.redirect('/admin/register');
    res.send("Admin Already Exist")
  }

});

const getAllComplaints = asyncWrapper(async (req, res) => {
  const task = await Complaint.find({});
  res.json(task);    
});

const getAdmin = asyncWrapper(async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    const tasks =await Admin.findOne({ email })
    .then(user => {
        if (!user) {
              req.flash('message','Admin does not Exist')
              res.redirect('/admin/login');
        }
  
        bcrypt.compare(password, user.password, async(err, data) => {
            //if error than throw error
            if (err){
              req.flash('message','Admin does not Exist')
              res.redirect('/admin/login');

            }
  
            //if both match than you can do anything
            if (data) {
              const task = await Complaint.find({});
              
              // console.log();
              session=req.session;
              session.userId = user._id;
              res.render("admin/dashboard",{records:task})

              // console.log('/admin/dashboard')

              //  res.redirect('/admin/dashboard')
                // return res.status(200).json({ msg: "Login success" })
            } 
            else {
              req.flash('message','Invalid Credentials')
              res.redirect('/admin/login');
                // return res.status(401).json({ msg: "Invalid credencial" })
            }
  
        })
  
    })
  
});

const getAllUsers = asyncWrapper(async (req, res) => {
  const users =await Register.find({});
//const users_email = users.map(a => a.email);

const files = await MultipleFile.distinct('files')
const total_users = Object.keys(users).length;
const total_files = Object.keys(files).length;
  res.render("admin/users",{ records:files,totalUsers:total_users,totalFiles:total_files})

})

// const getUserDetails = asyncWrapper(async (req, res) => {
//   try{
//     // const user = await Register.find({email:req.params.email})
//     const files = await MultipleFile.distinct('files',{userid:req.params.id})
    
//     res.render('admin/usersbill',{records:files})


// }catch(error) {
//     res.status(400).send(error.message);
// }


// })



module.exports = {
    getAdmin,addAdmin,getAllUsers,getAllComplaints
    //getUserDetails
};

const express = require("express");
const router = express.Router();

const { getAdmin,addAdmin,getAllUsers,getAllComplaints
    } = require("../controllers/admin");

router.route("/login").post(getAdmin);

router.route("/register").post(addAdmin);

router.route("/getUsers").get(getAllUsers);

router.route("/addAdmin").post(addAdmin);

router.route("/getAllComplaints").get(getAllComplaints);

// router.route("/getUserDetails/:id").get(getUserDetails)

module.exports = router;

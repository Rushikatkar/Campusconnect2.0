const Router = require("express");
const { loginAdmin, 
        registerAdmin } = require("../../controllers/admin.controller.js");
const { adminstudentdata,
        getUserById } = require('../../controllers/adminstudentdata.controller');
const {createAdminProfile,
       getAdminProfileById, 
       getStudentsOfCollege,
       viewAdminProfile}=require('../../controllers/adminprofilecontroller.js')

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.post('/studentprofile', adminstudentdata);
router.post('/findadminuser', getUserById);
router.post('/createadminprofile',createAdminProfile);
router.post('/getadminprofile',getAdminProfileById);
router.post('/getstudentofcollege',getStudentsOfCollege);
router.post('/viewadminprofile', viewAdminProfile);

module.exports = router;

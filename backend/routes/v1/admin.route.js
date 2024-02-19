const Router = require("express");
const { loginAdmin, registerAdmin } = require("../../controllers/admin.controller.js");
const { adminstudentdata,getUserById } = require('../../controllers/adminstudentdata.controller');

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.post('/studentprofile', adminstudentdata);
router.post('/findadminuser', getUserById);

module.exports = router;

const Router = require("express");
const { loginCompany, 
        registerCompany,
        getAllAdmins,
        createJob } = require("../../controllers/company.controller.js");

const router = Router();

router.route("/register").post(registerCompany);
router.route("/login").post(loginCompany);
router.route("/collegeadmins").get(getAllAdmins);
router.route("/createjob").post(createJob);

module.exports = router;

const Router = require("express");
const { loginCompany, registerCompany } = require("../../controllers/company.controller.js");

const router = Router();

router.route("/register").post(registerCompany);
router.route("/login").post(loginCompany);

module.exports = router;

const Router = require("express");
const { loginCampusAdmin, 
    registerCampusAdmin } = require("../../controllers/campusAdmin.controller");
const {saveCompanyInformation,
    updateCompanyInformation,
    deleteCompanyInformation
} = require("../../controllers/companyInformation.controller")

const router = Router();

router.route("/register").post(registerCampusAdmin);
router.route("/login").post(loginCampusAdmin);
router.route("/addnewcompany").post(saveCompanyInformation);
router.route("/updatenewcompany").post(updateCompanyInformation);
router.route("/deletenewcompany").post(deleteCompanyInformation);


module.exports = router;

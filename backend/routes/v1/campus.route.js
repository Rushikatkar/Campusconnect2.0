const Router = require("express");
const { loginCampusAdmin, 
    registerCampusAdmin } = require("../../controllers/campusAdmin.controller");
const {upload}=require('../../middlewares/multer.middleware');

const {saveCompanyInformation,
    updateCompanyInformation,
    deleteCompanyInformation,
    getAllCompanyInformation
} = require("../../controllers/companyInformation.controller")
const {fetchAllEmails}= require('../../controllers/studentprofile.controller');
const {saveJobRecord,
    updateJobRecord,
    deleteJobRecord
}= require('../../controllers/jobs.controller');

const router = Router();

router.route("/register").post(registerCampusAdmin);
router.route("/login").post(loginCampusAdmin);
router.route("/addnewcompany").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ]),
    saveCompanyInformation);
router.route("/updatecompany").post(updateCompanyInformation);
router.route("/deletecompany").post(deleteCompanyInformation);
router.route("/fetchallstudentemails").get(fetchAllEmails);
router.route('/allcompanyinformation').get(getAllCompanyInformation);
router.route("/addnewjob").post(saveJobRecord);
router.route("/updatejob").post(updateJobRecord);
router.route("/deletejob").post(deleteJobRecord);



module.exports = router;

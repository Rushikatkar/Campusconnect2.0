const Router = require("express");
const { loginCompany, 
        registerCompany,
        getAllAdmins,
        createJob,
        getAllCampusJobsByUserId
 } = require("../../controllers/company.controller.js");

const {
        saveSelectedstudent,
        rejectStudent,
        getUniqueSelectedStudentsByJobId,
        getUniqueRejectedStudentsByJobId
}= require("../../controllers/selectedstudent.controller.js");

const router = Router();

router.route("/register").post(registerCompany);
router.route("/login").post(loginCompany);
router.route("/collegeadmins").get(getAllAdmins);
router.route("/createjob").post(createJob);
router.route("/allcreatedjobs").get(getAllCampusJobsByUserId);
router.route("/selectstudent").post(saveSelectedstudent);
router.route("/rejectstudent").post(rejectStudent);
router.route("/selectedstudents").post(getUniqueSelectedStudentsByJobId);
router.route("/rejectedstudents").post(getUniqueRejectedStudentsByJobId);



module.exports = router;

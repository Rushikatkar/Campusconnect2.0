const { studentinfo, companyInfo, companyData } = require('../../controllers/studentinfoController');
const { studentProfileController,findStudentProfileController } = require('../../controllers/studentprofile.controller');
const { fetchCompanyData, createCompany, fetchCompanyDetail } = require('../../controllers/companyinfo.controller'); // Import fetchCompanyDetail from the controller
const {getjobs, searchJobsByCollege}= require('../../controllers/jobs.controller');
const {upload}=require('../../middlewares/multer.middleware');
const {createCampusJobApply,getRecordsByJobId}=require('../../controllers/campusjobapply.controller');

const express = require('express');
const router = express.Router();

router.post('/student', studentinfo);
router.post('/company', companyInfo);
// router.post('/studentprofile', studentProfileController);
router.route("/studentprofile").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"resume",
            maxCount:1
        }
    ]),
    studentProfileController
    );


router.get('/profile', findStudentProfileController);
router.get('/companydata', companyData);
router.get('/companyinfo', fetchCompanyData);
router.get('/companyinfo/:companyName', fetchCompanyDetail); // Add the new route for fetching detailed company information
router.get('/jobs',getjobs);
router.post('/campusjob',searchJobsByCollege);
router.post('/campusjobapply',createCampusJobApply);
router.post('/jobappied',getRecordsByJobId);

router.post('/createcompany', createCompany);

module.exports = router;

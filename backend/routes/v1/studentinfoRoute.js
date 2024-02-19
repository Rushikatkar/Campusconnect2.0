const { studentinfo, companyInfo, companyData } = require('../../controllers/studentinfoController');
const { studentProfileController,findStudentProfileController } = require('../../controllers/studentprofile.controller');
const { fetchCompanyData, createCompany, fetchCompanyDetail } = require('../../controllers/companyinfo.controller'); // Import fetchCompanyDetail from the controller
const {getjobs}= require('../../controllers/jobs.controller');

const express = require('express');
const router = express.Router();

router.post('/student', studentinfo);
router.post('/company', companyInfo);
router.post('/studentprofile', studentProfileController);
router.get('/profile', findStudentProfileController);
router.get('/companydata', companyData);
router.get('/companyinfo', fetchCompanyData);
router.get('/companyinfo/:companyName', fetchCompanyDetail); // Add the new route for fetching detailed company information
router.get('/jobs',getjobs);

router.post('/createcompany', createCompany);

module.exports = router;

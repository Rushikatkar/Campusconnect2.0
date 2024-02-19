const Company = require('../models/companyinfoModel');

const fetchCompanyData = async (req, res) => {
  try {
    const companies = await Company.find({}); // Fetch all companies from the database

    // Check if any companies were found
    if (companies.length === 0) {
      return res.status(404).json({ message: 'No companies found' });
    }

    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const fetchCompanyDetail = async (req, res) => {
  try {
    const companyName = req.query.companyName; // Extract the company name from the query parameters
    console.log('companyName in backend:', companyName);

    // Fetch only one document from the database based on the companyName
    const company = await Company.findOne({ "companyInformation.company_name": companyName });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    console.log('Company found:', company); // Log the company object after querying

    // Return detailed information about the company
    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const createCompany = async (req, res) => {
  try {
    // Extract company data from the request body
    const {
      company_name,
      cgpa,
      backlogs,
      marks,
      aboutCompany,
      recruitmentProcess,
      onlineTest,
      technicalRounds,
      hrRound,
      academicEligibleCriterias,
      questionsAsked,
      whereToApply
    } = req.body;

    // Create a new Company document
    const newCompany = new Company({
      company_name,
      cgpa,
      backlogs,
      marks,
      aboutCompany,
      recruitmentProcess,
      onlineTest,
      technicalRounds,
      hrRound,
      academicEligibleCriterias,
      questionsAsked,
      whereToApply
    });

    // Save the new Company document to the database
    await newCompany.save();

    // Respond with success message
    res.status(201).json({ message: 'Company information saved successfully' });
  } catch (error) {
    console.error('Error saving company information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  fetchCompanyData,
  fetchCompanyDetail,
  createCompany
};

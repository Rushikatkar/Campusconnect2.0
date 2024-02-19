const mongoose = require('mongoose');

// Define schema for company information
const companySchema = new mongoose.Schema({
  companyInformation: {
    company_name: {
      type: String,
      required: true
    },
    cgpa: {
      type: Number,
      required: true
    },
    backlogs: {
      type: Number,
      required: true
    },
    marks: {
      type: Number,
      required: true
    },
    aboutCompany: {
      title: String,
      description: String
    },
    recruitmentProcess: {
      title: String,
      steps: [String]
    },
    eligibleCriterias: {
      title: String,
      criteria: String,
      details: [String]
    },
    questionsAsked: {
      title: String,
      questions: [String]
    },
    whereToApply: {
      links: [{
        name: String,
        url: String
      }]
    }
  }
});

// Create a model from the schema
const Company = mongoose.model('Company', companySchema);

// Export the model
module.exports = Company;

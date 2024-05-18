const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyInformationSchema = new Schema({
  company_name: String,
  cgpa: Number,
  backlogs: Number,
  marks: Number,
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
  },
  // New field for image data
  image: {
    url: String,
    public_id: String
  }
});

const CompanyInformation = mongoose.model('CompanyInformation', companyInformationSchema);

module.exports = CompanyInformation;

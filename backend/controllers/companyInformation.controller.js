const fs = require('fs');

const CompanyInformation = require('../models/companyInformation.model');
const { uploadOnCloudinary } = require('../utils/cloudinary');

// Controller function to save company information with image
const saveCompanyInformation = async (req, res) => {
  try {
    const {
      company_name,
      cgpa,
      backlogs,
      marks,
      aboutCompany,
      recruitmentProcess,
      eligibleCriterias,
      questionsAsked,
      whereToApply,
    } = req.body;

    // Check if avatar file is provided
    const avatarFilePath = req.files?.avatar[0]?.path;
    if (!avatarFilePath) {
      return res.status(400).json({ error: 'Avatar file is required' });
    }

    // Upload image to Cloudinary
    const avatarUploadResult = await uploadOnCloudinary(avatarFilePath);
    // Create new company information object
    const companyInfo = new CompanyInformation({
      company_name,
      cgpa,
      backlogs,
      marks,
      aboutCompany,
      recruitmentProcess,
      eligibleCriterias,
      questionsAsked,
      whereToApply,
      image: {
        url: avatarUploadResult.url,
        public_id: avatarUploadResult.public_id,
      },
    });

    // Save the company information to the database
    await companyInfo.save();

    // Remove the local avatar file after uploading to Cloudinary
    // fs.unlinkSync(avatarFilePath);

    res.status(201).json({ message: 'Company information saved successfully' });
  } catch (error) {
    console.error('Error saving company information:', error);
    res.status(500).json({ error: 'An error occurred while saving company information' });
  }
};

// Controller function to update company information by ID from request body
const updateCompanyInformation = async (req, res) => {
  try {
    const { _id } = req.body; // Assuming ID is in req.body as _id
    const updateData = req.body;

    const updatedCompanyInfo = await CompanyInformation.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedCompanyInfo) {
      return res.status(404).json({ error: 'Company information not found' });
    }

    res.json(updatedCompanyInfo);
  } catch (error) {
    console.error('Error updating company information:', error);
    res.status(500).json({ error: 'An error occurred while updating company information' });
  }
};

// Controller function to delete company information by ID from request body
const deleteCompanyInformation = async (req, res) => {
  try {
    const { _id } = req.body; // Assuming ID is in req.body as _id
    console.log(_id);
    const deletedCompanyInfo = await CompanyInformation.findByIdAndDelete(_id);

    if (!deletedCompanyInfo) {
      return res.status(404).json({ error: 'Company information not found' });
    }

    res.json({ message: 'Company information deleted successfully' });
  } catch (error) {
    console.error('Error deleting company information:', error);
    res.status(500).json({ error: 'An error occurred while deleting company information' });
  }
};

const getAllCompanyInformation = async (req, res) => {
  try {
    const companyInfoList = await CompanyInformation.find(); // Fetch all documents from the collection
    res.json(companyInfoList); // Return the list of company information
  } catch (error) {
    console.error('Error fetching company information:', error);
    res.status(500).json({ error: 'An error occurred while fetching company information' });
  }
};

module.exports = {
  saveCompanyInformation,
  updateCompanyInformation,
  deleteCompanyInformation,
  getAllCompanyInformation
};

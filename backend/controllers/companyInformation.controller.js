const CompanyInformation = require('../models/companyInformation.model');

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
      image // Assuming image is sent as base64 encoded data
    } = req.body;

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
        data: Buffer.from(image, 'base64'), // Convert base64 data to buffer
        contentType: 'image/jpeg' // Update content type based on the image format
      }
    });

    await companyInfo.save();

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

module.exports = {
  saveCompanyInformation,
  updateCompanyInformation,
  deleteCompanyInformation
};

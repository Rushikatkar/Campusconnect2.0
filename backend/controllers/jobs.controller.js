const jobsmodel = require('../models/jobs.model');
const CampusJob =require('../models/campusjob.model');

const getjobs = async (req, res) => {
    try {
        const jobs = await jobsmodel.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching student profile:", error);
        res.status(500).json({ error: "An error occurred while fetching student profile" });
    }
};

const searchJobsByCollege = async (req, res) => {
    try {
        const collegeName = req.body.collegeName; // Extracting collegeName from request body
        // console.log(collegeName);

        // Check if collegeName is provided in the request body
        if (!collegeName) {
            return res.status(400).json({ success: false, message: 'College name is missing in the request body' });
        }

        // Search for jobs by college name
        const jobs = await CampusJob.find({ college_name: collegeName });

        if (jobs.length === 0) {
            return res.status(404).json({ success: false, message: 'No jobs found for the specified college' });
        }

        res.status(200).json({ success: true, message: 'Jobs found for the specified college', jobs });
    } catch (error) {
        console.error('Error searching jobs by college:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Controller function to save a new job record
const saveJobRecord = async (req, res) => {
    try {
      const {
        id,
        type,
        url,
        company,
        company_url,
        location,
        title,
        description,
        how_to_apply,
        // collegename
      } = req.body;
  
      // Create new job record object
      const newJob = new jobsmodel({
        id,
        type,
        url,
        created_at: new Date(), // Automatically set the current date and time
        company,
        company_url,
        location,
        title,
        description,
        how_to_apply,
        // collegename
      });
  
      // Save the job record to the database
      await newJob.save();
  
      res.status(201).json({ message: 'Job record saved successfully' });
    } catch (error) {
      console.error('Error saving job record:', error);
      res.status(500).json({ error: 'An error occurred while saving the job record' });
    }
  };
  
// Controller function to update a job record by ID
const updateJobRecord = async (req, res) => {
    try {
        const { id, ...updateData } = req.body; // Destructure id and remaining fields from the request body

        const updatedJob = await jobsmodel.findOneAndUpdate({ id }, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ error: 'Job record not found' });
        }

        res.json({ message: 'Job record updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job record:', error);
        res.status(500).json({ error: 'An error occurred while updating the job record' });
    }
};

// Controller function to delete a job record by ID
const deleteJobRecord = async (req, res) => {
    try {
        const { _id } = req.body; // Get the id from the request body

        const deletedJob = await jobsmodel.findOneAndDelete({ _id });

        if (!deletedJob) {
            return res.status(404).json({ error: 'Job record not found' });
        }

        res.json({ message: 'Job record deleted successfully' });
    } catch (error) {
        console.error('Error deleting job record:', error);
        res.status(500).json({ error: 'An error occurred while deleting the job record' });
    }
};

module.exports = {
    getjobs,
    searchJobsByCollege,
    saveJobRecord,
    updateJobRecord,
    deleteJobRecord
};

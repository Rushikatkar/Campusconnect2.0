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


module.exports = {
    getjobs,
    searchJobsByCollege
};

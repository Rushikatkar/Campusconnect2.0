const jobsmodel = require('../models/jobs.model');

const getjobs = async (req, res) => {
    try {
        const jobs = await jobsmodel.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching student profile:", error);
        res.status(500).json({ error: "An error occurred while fetching student profile" });
    }
};

module.exports = {
    getjobs
};

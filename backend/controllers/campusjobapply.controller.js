const CampusJobApply = require('../models/campusjobapply.model');
const StudentProfileModel = require('../models/studentprofileModel');
// Controller function to create a new student job entry
const createCampusJobApply = async (req, res) => {
    try {
        const { userId, jobId } = req.body;

        // Create a new student job entry
        const newCampusJobApply = new CampusJobApply({
            userId: userId,
            jobId: jobId
        });

        // Save the student job entry to the database
        await newCampusJobApply.save();

        res.status(201).json({ success: true, message: 'Student job created successfully' });
    } catch (error) {
        console.error('Error creating student job:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getRecordsByJobId = async (req, res) => {
    try {
        const { jobId } = req.body; // Extract jobId from the request body
        // Find all records with the specified jobId
        const records = await CampusJobApply.find({ jobId: jobId });

        // Extract userIds from the records
        const userIds = records.map(record => record.userId);

        // Fetch user profiles for the obtained userIds
        const userProfilePromises = userIds.map(userId => {
            return StudentProfileModel.findOne({ userId: userId });
        });

        const userProfiles = await Promise.all(userProfilePromises);

        res.status(200).json({ success: true, data: userProfiles });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

module.exports={
    createCampusJobApply,
    getRecordsByJobId
}
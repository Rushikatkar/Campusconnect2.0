// controllers/selectionController.js
const Selection = require('../models/selectedstudent.model');
const RejectedStudent = require('../models/rejectstudent.model');

// Controller to save a new selection
const saveSelectedstudent = async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        
        // Check if userId and jobId are provided
        if (!userId || !jobId) {
            return res.status(400).json({ error: 'userId and jobId are required fields' });
        }

        // Check if the selection already exists
        const existingSelection = await Selection.findOne({ userId, jobId });
        if (existingSelection) {
            return res.status(201).json({ success: false, message: 'Student already selected for this job' });
        }

        // Create a new selection
        const newSelection = new Selection({ userId, jobId });

        // Save the selection to the database
        await newSelection.save();

        res.status(201).json({ success: true, message: 'Selection saved successfully' });    } catch (error) {
        console.error('Error saving selection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const rejectStudent = async (req, res) => {
    try {
        const { userId, jobId } = req.body;
        
        // Check if userId and jobId are provided
        if (!userId || !jobId) {
            return res.status(400).json({ error: 'userId and jobId are required fields' });
        }

        // Check if the rejection already exists
        const existingRejection = await RejectedStudent.findOne({ userId, jobId });
        if (existingRejection) {
            return res.status(201).json({ success: false, message: 'Student already rejected for this job' });
        }

        // Create a new rejection
        const newRejection = new RejectedStudent({ userId, jobId });

        // Save the rejection to the database
        await newRejection.save();

        res.status(201).json({ success: true, message: 'Selection rejected successfully' }); 
     
        } catch (error) {
        console.error('Error rejecting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUniqueSelectedStudentsByJobId = async (req, res) => {
    try {
        const { jobId } = req.body;
        
        // Check if jobId is provided
        if (!jobId) {
            return res.status(400).json({ error: 'jobId is a required field' });
        }

        // Fetch unique selected students by jobId
        const uniqueSelectedStudents = await Selection.find({ jobId }).distinct('userId');

        res.status(200).json({ success: true, data: uniqueSelectedStudents });
    } catch (error) {
        console.error('Error fetching unique selected students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to fetch unique rejected students by jobId
const getUniqueRejectedStudentsByJobId = async (req, res) => {
    try {
        const { jobId } = req.body;
        
        // Check if jobId is provided
        if (!jobId) {
            return res.status(400).json({ error: 'jobId is a required field' });
        }

        // Fetch unique rejected students by jobId
        const uniqueRejectedStudents = await RejectedStudent.find({ jobId }).distinct('userId');

        res.status(200).json({ success: true, data: uniqueRejectedStudents });
    } catch (error) {
        console.error('Error fetching unique rejected students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    saveSelectedstudent,
    rejectStudent,
    getUniqueSelectedStudentsByJobId,
    getUniqueRejectedStudentsByJobId
};

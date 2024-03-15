const mongoose = require('mongoose');

const studentJobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you have a User model
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, // Assuming you have a Job model
    appliedAt: { type: Date, default: Date.now }
});

const CampusJobApply = mongoose.model('StudentApplyJob', studentJobSchema);

module.exports = CampusJobApply;

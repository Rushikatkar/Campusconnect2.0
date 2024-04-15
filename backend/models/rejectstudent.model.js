// models/Selection.js
const mongoose = require('mongoose');

const rejectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    selectedAt: { type: Date, default: Date.now }
});

const RejectedStudent = mongoose.model('RejectedStudent', rejectionSchema);

module.exports = RejectedStudent;

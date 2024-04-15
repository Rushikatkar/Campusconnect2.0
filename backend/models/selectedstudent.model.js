// models/Selection.js
const mongoose = require('mongoose');

const selectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    selectedAt: { type: Date, default: Date.now }
});

const Selectedstudent = mongoose.model('SelectedStudent', selectionSchema);

module.exports = Selectedstudent;

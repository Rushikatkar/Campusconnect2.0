const mongoose = require('mongoose');

const campusjobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model to reference
        required: true
    },
    type: String,
    jobURL: String,
    created_at: Date,
    company: String,
    company_url: String,
    location: String,
    title: String,
    description: String,
    how_to_apply: String,
    company_logo: String,
    college_name: String,
    department: [String],
    hscmarks: Number,
    cgpa: Number,
    backlogs: Number,
});

const CampusJob = mongoose.model('campusjob', campusjobSchema);

module.exports = CampusJob;

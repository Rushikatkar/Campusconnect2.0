const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model if needed
        required: true
    },
    email: String,
    student_name: String,
    date_of_birth: Date,
    address: String,
    college_name: String,
    marksofssc: Number,
    marksofhsc: Number,
    diploma_cgpa: Number,
    diploma_backlogs: Number,
    degree_cgpa: Number,
    degree_backlogs: Number,
    avatar: {
        type: String, // cloudinary url
    },
    resume: {
        data: Buffer, // Store binary data
        contentType: String // Mime type of the file
    },
    github_url : {
        type: String,
    },
    linkedin_url:{
        type: String,
    },
    portfolio_url:{
        type: String,
    },
    interested_domain:{
        type: String,
    },
    number_of_project_done:{
        type: Number,
    }
});

const StudentProfileModel = mongoose.model('StudentProfile', ProfileSchema);
module.exports = StudentProfileModel;

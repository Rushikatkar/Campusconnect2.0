const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model if needed
        required: true
    },
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
    }
});

const StudentProfileModel = mongoose.model('StudentProfile', ProfileSchema);
module.exports = StudentProfileModel;

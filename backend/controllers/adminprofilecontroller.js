const AdminProfileModel = require('../models/adminprofile.model'); // Adjust the path accordingly
const StudentProfileModel= require('../models/studentprofileModel');
// const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const fs = require('fs');

// Create a new admin profile
const createAdminProfile = async (req, res) => {
    try {
        const { adminId, admin_name, email, contact, college_name, experience, departments } = req.body;
        
        // Check if email already exists in the database
        const existingAdmin = await AdminProfileModel.findOne({ email });
        if (existingAdmin) {
            return res.status(201).json({success:false, message: "Email is already registered" });
        }

        // Create AdminProfileModel object with form data
        const newAdminProfile = new AdminProfileModel({
            adminId,
            admin_name,
            email,
            contact,
            college_name,
            experience,
            departments
        });

        // Save the data to the database
        const savedProfile = await newAdminProfile.save();
        res.status(201).json( {success:true, savedProfile});
    } catch (error) {
        console.error("Error creating admin profile:", error);
        res.status(500).json({ success:false, error: 'Could not create admin profile' });
    }
};

const getAdminProfileById = async (req, res) => {
    try {
        const { adminId } = req.body;

        // Find admin profile by adminId
        const adminProfile = await AdminProfileModel.find({ adminId });

        if (!adminProfile) {
            return res.status(404).json({ success: false, message: 'Admin profile not found' });
        }

        // Send the admin profile in the response
        res.status(200).json({ success: true, adminProfile });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({ success: false, error: 'Could not fetch admin profile' });
    }
};

const getStudentsOfCollege = async (req, res) => {
    try {
        const { college_name, department } = req.body;

        // Find students with the given college_name and department
        const students = await StudentProfileModel.find({ college_name, department });

        if (!students || students.length === 0) {
            return res.status(404).json({ status: false, error: 'No students found for this college and department' });
        }

        // Get the count of students
        const studentCount = students.length;

        // Send the count of students in the response
        res.status(200).json({ success: true, studentCount });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ success: false, error: 'Could not fetch students' });
    }
};

const viewAdminProfile= async (req, res)=>{
    try {
        const {adminId}= req.body;
        const adminProfile= await AdminProfileModel.find({adminId});

        if(!adminProfile){
           return res.status(404).json({status:false, message: 'Profile not found'});
        }
        res.status(200).json({status:true,adminProfile});
    } catch (error) {
        console.log(error.message);
    }
    
}

module.exports = {
    createAdminProfile,
    getAdminProfileById,
    getStudentsOfCollege,
    viewAdminProfile
};

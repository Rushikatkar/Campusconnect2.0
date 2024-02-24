const StudentProfileModel = require("../models/studentprofileModel");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

const studentProfileController = async (req, res) => {
    try {
        const { userId, student_name, date_of_birth, address, college_name, marksofssc, marksofhsc, diploma_cgpa, diploma_backlogs, degree_cgpa, degree_backlogs } = req.body;

        console.log(student_name);
        // Check if required fields are empty
        if ([userId, student_name, date_of_birth, address, college_name, marksofssc, marksofhsc, diploma_cgpa, diploma_backlogs, degree_cgpa, degree_backlogs].some((field) => field === undefined || field.trim() === "")) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if avatar file is provided
        const avatarLocalPath = req.files?.avatar[0]?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ error: "Avatar file is required" });
        }

        // Upload image to Cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        // Create StudentProfileModel object with form data and image URL from Cloudinary
        const input = new StudentProfileModel({
            userId,
            student_name,
            date_of_birth,
            address,
            college_name,
            marksofssc,
            marksofhsc,
            diploma_cgpa,
            diploma_backlogs,
            degree_cgpa,
            degree_backlogs,
            avatar: avatar.url // Assuming the field in the schema is named "avatar"
        });

        // Save the data to the database
        const result = await input.save();
        console.log("Data saved:", result);

        res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "An error occurred while saving data" });
    }
};
const findStudentProfileController = async (req, res) => {
    try {
        const { userId } = req.query; // Retrieve userId from query parameters
        console.log("Searching for user with ID:", userId);

        const userProfile = await StudentProfileModel.findOne({ userId });
        
        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }

        res.status(200).json({ userProfile });
    } catch (error) {
        console.error("Error finding user profile:", error);
        res.status(500).json({ error: "An error occurred while searching for user profile" });
    }
};

module.exports = {
    studentProfileController,
    findStudentProfileController,
};

const fs = require('fs');
const StudentProfileModel = require("../models/studentprofileModel");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");

const studentProfileController = async (req, res) => {
    try {
        const { userId, email , student_name, date_of_birth, address, college_name, marksofssc, marksofhsc, diploma_cgpa, diploma_backlogs, degree_cgpa, degree_backlogs, github_url, linkedin_url, portfolio_url, interested_domain,number_of_project_done } = req.body;

        // Check if userId already exists in the database
        const existingProfile = await StudentProfileModel.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: 'You already created profile. You can update instead' });
        }

        // Check if required fields are empty
        if ([userId, email , student_name, date_of_birth, address, college_name, marksofssc, marksofhsc, diploma_cgpa, diploma_backlogs, degree_cgpa, degree_backlogs].some((field) => field === undefined || field.trim() === "")) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if avatar file is provided
        const avatarLocalPath = req.files?.avatar[0]?.path;
        if (!avatarLocalPath) {
            return res.status(400).json({ error: "Avatar file is required" });
        }

        // Check if resume file is provided
        const resumeFile = req.files?.resume[0];
        if (!resumeFile) {
            return res.status(400).json({ error: "Resume file is required" });
        }

        // Upload image to Cloudinary (if needed)
        const avatar = await uploadOnCloudinary(avatarLocalPath);

        // Read resume file and convert to binary data
        const resumeData = fs.readFileSync(resumeFile.path);

        // Create StudentProfileModel object with form data and resume file
        const input = new StudentProfileModel({
            userId,
            email,
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
            avatar: avatar.url, // Assuming the field in the schema is named "avatar"
            resume: {
                data: resumeData,
                contentType: resumeFile.mimetype
            },
            github_url,
            linkedin_url,
            portfolio_url,
            interested_domain,
            number_of_project_done
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

const findStudent = async (req, res) => {
    try {
        const { userId } = req.body; // Retrieve userId from query parameters
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

const fetchAllEmails = async (req, res) => {
    try {
        const emails = await StudentProfileModel.find({ email: { $exists: true, $ne: null } }, 'email'); // Find all profiles with email field present and not null
        res.status(200).json({ emails });
    } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).json({ error: "An error occurred while fetching emails" });
    }
};

module.exports = {
    studentProfileController,
    findStudentProfileController,
    findStudent,
    fetchAllEmails
};

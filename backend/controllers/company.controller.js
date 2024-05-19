const asyncHandler = require("../utils/asyncHandler.js");
const {ApiError} = require("../utils/ApiError.js");
const Company = require("../models/company.model.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Admin = require('../models/admin.model.js');
const CampusJob = require('../models/campusjob.model.js');

const jwt = require("jsonwebtoken");

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const company = await Company.findById(userId);
        const accessToken = company.generateAccessToken(); // Using admin's method for generating tokens
        const refreshToken = company.generateRefreshToken(); // Using admin's method for generating tokens

        company.refreshToken = refreshToken;
        await company.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const registerCompany = asyncHandler(async (req, res) => {
    const {  fullName,username, email, password, companyName } = req.body;

    if ([ fullName,username,email, password, companyName].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await Company.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const company = await Company.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        companyName // Add collegeName to the admin creation
    });

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(company._id);

    const createdCompany = await Company.findById(company._id).select("-password -refreshToken");

    if (!createdCompany) {
        throw new ApiError(500, "Something went wrong while registering the company");
    }

    return res.status(201).json(new ApiResponse(200, { company: createdCompany, accessToken, refreshToken }, "Company registered Successfully"));
});

const loginCompany = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "email is required");
    }

    const company = await Company.findOne({
        $or: [{ email }]
    });

    if (!company) {
        throw new ApiError(404, "Company does not exist");
    }

    const isPasswordValid = await company.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid company credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(company._id);

    const loggedInCompany = await Company.findById(company._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { company: loggedInCompany, accessToken, refreshToken }, "Company logged In Successfully"));
});


const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, '-password -refreshToken'); // Exclude password and refreshToken from response
        res.status(200).json({ success: true, admins });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



const createJob = async (req, res) => {
    try {
        // Extract job data from request body
        const {
            userId,
            type,
            jobURL,
            company,
            company_url,
            location,
            title,
            description,
            how_to_apply,
            company_logo,
            college_name,
            department,
            hscmarks,
            cgpa,
            backlogs// Add collegename parameter
        } = req.body;

        // Set the current date and time
        const created_at = new Date();

        // Create a new job document
        const newJob = new CampusJob({
            userId,
            type,
            jobURL,
            created_at,
            company,
            company_url,
            location,
            title,
            description,
            how_to_apply,
            company_logo,
            college_name,
            department,
            hscmarks,
            cgpa,
            backlogs
        });

        // Save the job document to the database
        await newJob.save();

        console.log('Job information created:', newJob);

        res.status(201).json({ success: true, message: 'Job information created successfully', newJob });
    } catch (error) {
        console.error('Error creating job information:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getAllCampusJobsByUserId = async (req, res) => {
    try {
        // Extract userId from request parameters or body
        const { userId } = req.query; // Assuming userId is provided as a request parameter

        // Query the database to find all campus job records with the provided userId
        const campusJobs = await CampusJob.find({ userId });

        // Return the matching records as a response
        res.status(200).json(campusJobs);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching campus jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    registerCompany,
    loginCompany,
    getAllAdmins,
    createJob,
    getAllCampusJobsByUserId,
};

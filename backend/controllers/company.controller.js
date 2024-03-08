const asyncHandler = require("../utils/asyncHandler.js");
const {ApiError} = require("../utils/ApiError.js");
const Company = require("../models/company.model.js");
const ApiResponse = require("../utils/ApiResponse.js");
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

module.exports = {
    registerCompany,
    loginCompany,
};

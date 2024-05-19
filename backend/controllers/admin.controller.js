const asyncHandler = require("../utils/asyncHandler.js");
const {ApiError} = require("../utils/ApiError.js");
const Admin = require("../models/admin.model.js");
const ApiResponse = require("../utils/ApiResponse.js");
const jwt = require("jsonwebtoken");

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const admin = await Admin.findById(userId);
        const accessToken = admin.generateAccessToken(); // Using admin's method for generating tokens
        const refreshToken = admin.generateRefreshToken(); // Using admin's method for generating tokens

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const registerAdmin = asyncHandler(async (req, res) => {
    const { fullName, email, username, password, collegeName, contact } = req.body;

    if ([fullName, email, username, password, collegeName, contact].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await Admin.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const admin = await Admin.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        collegeName, // Add collegeName to the admin creation
        contact
    });

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(admin._id);

    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while registering the admin");
    }

    return res.status(201).json(new ApiResponse(200, { admin: createdAdmin, accessToken, refreshToken }, "Admin registered Successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "email is required");
    }

    const admin = await Admin.findOne({
        $or: [{ email }]
    });

    if (!admin) {
        throw new ApiError(404, "Admin does not exist");
    }

    const isPasswordValid = await admin.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid admin credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(admin._id);

    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { admin: loggedInAdmin, accessToken, refreshToken }, "Admin logged In Successfully"));
});

module.exports = {
    registerAdmin,
    loginAdmin,
};

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
    {
      department_name: String,
      students: {
        type: Map,
        of: Number,
        default: {}
      }
    },
    { _id: false } // Exclude the _id field from the subdocuments
  );

const adminProfileSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Reference to the User model if needed
        required: true
    },
    admin_name: String,
    email: String,
    contact: Number,
    college_name: String,
    experience: Number,
    // avatar: {
    //     type: String, // cloudinary url
    // },
    departments: [departmentSchema] // Array of department objects
});

const AdminProfileModel = mongoose.model("adminprofile", adminProfileSchema);

module.exports = AdminProfileModel;

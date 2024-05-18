const mongoose = require('mongoose');

const jobsModelSchema = new mongoose.Schema({
    id : String,
    type: String,
    url: String,
    created_at: Date,
    company: String,
    company_url: String,
    location: String,
    title: String,
    description: String,
    how_to_apply: String,
    // company_logo: String,
    // collegename: String  // Adding collegename field
});

const jobsModel = mongoose.model('jobs', jobsModelSchema);

module.exports = jobsModel;

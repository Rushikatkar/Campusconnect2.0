const mongoose = require('mongoose');

const jobsmodelschema = new mongoose.Schema({
    id: String,
    type: String,
    url: String,
    created_at: Date,
    company: String,
    company_url: String,
    location: String,
    title: String,
    description: String,
    how_to_apply: String,
    company_logo: String
});

const jobsmodel = mongoose.model('jobs', jobsmodelschema);

module.exports = jobsmodel;

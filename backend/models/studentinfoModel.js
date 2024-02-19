const mongoose= require('mongoose');

const studentinfoSchema=new mongoose.Schema({
    company_name:String,
    marks:Number,
    cgpa:Number,
    backlogs:Number,
})

const studentinfoModel=mongoose.model('studentinfo',studentinfoSchema)
module.exports=studentinfoModel;
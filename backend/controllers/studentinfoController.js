const studentinfoModel= require('../models/studentinfoModel');

const studentinfo=(req,res)=>{
    const {marks,cgpa,backlogs}=req.body

    const pipeline=[
        {
        $match:{
            marks:{$lte:marks},
            cgpa:{$lte:cgpa},
            backlogs:{$gte:backlogs},
        }
    }
];
    studentinfoModel.aggregate(pipeline)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    })
}


const companyInfo=async(req,res)=>{
    const {company_name}=req.body
   await studentinfoModel.find({company_name})
    .then((data)=>{
        res.status(200).json(data)
        // res.json(data)
    })
    .catch((error)=>{
        res.status(500).json({Error:'Internal error occured'});
        console.log(error);
    })
}

const companyData= async(req,res)=>{
  await studentinfoModel.find()
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch((error)=>{
    console.log(error);
  })
}




module.exports={
    studentinfo,
    companyInfo,
    companyData,
}
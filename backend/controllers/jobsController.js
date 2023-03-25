const Job = require('../models/jobModel.js');
const jobType = require('../models/jobTypeModel');

const ErrorResponse = require("../utils/errorResponse");

// create job category
exports.createJob = async(req,res, next)=>{
    try{
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location:req.user.location,
            jobType:req.user.jobType,
            user:req.user.id
        });
        res.status(201).json({
            success: true,
            job
        })
    } catch(error){

        next(error);
    }
}

// single job 
exports.singleJob = async(req,res, next)=>{
    try{
        const job = await Job.findById(req.params.id);
        res.status(201).json({
            success: true,
            job
        })
    } catch(error){

        next(error);
    }
}

// update job 
exports.updateJob = async(req,res, next)=>{
    try{
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body,{new: true}).populate('jobType', 'jobTypeName').populate('user', 'firstName lastName');
        res.status(201).json({
            success: true,
            job
        })
    } catch(error){

        next(error);
    }
}

// update job 
exports.showJobs = async(req,res, next)=>{
//enable query
const keyword = req.query.keyword ? {
    title:{

        $regex: req.query.keyword,
        $options: 'i'
    }
}: {}

// filter by category
let ids = [];
const jobTypeCategory = await jobType.find({}, { _id:1})
jobTypeCategory.forEach(cat => {
    ids.push(cat._id);
});

let cat = req.query.cat;
let categ = cat !== '' ? cat : ids;

// jobs by Location
let locations= [];
const jobByLocation = await job.find({}, {location: 1} );
jobByLocation.forEach(val =>{
    locations.push(val.location);
} );

    let setUniqueLocation = {...new Set(location)};
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;

    //pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    //const count = await User.find({}).estimatedDocumentCount();
    const count = await User.find({...keyword, jobType: categ, location: locationFilter}).countDocuments();
    try{
        const job = await Job.find(...keyword).skip(pageSize * (page - 1)).limit(pageSize)
        res.status(201).json({
            success: true,
            job,
            page,
            pages: Math.ceil(count/ pageSize),
            count,
            setUniqueLocation

        })
    } catch(error){

        next(error);
    }
}
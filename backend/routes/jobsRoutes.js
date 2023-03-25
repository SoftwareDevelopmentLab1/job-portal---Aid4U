const express = require("express");
const { createJob, singleJob, updateJob, showJobs } = require("../controllers/jobsController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router= express.Router();

//job type routes
router.post('/job/create', isAdmin, createJob)

//id
router.get('/job/:id', singleJob)


router.put('/job/update/:job_id', isAuthenticated, updateJob)

//id
router.get('/jobs/show', showJobs);


module.exports = router;
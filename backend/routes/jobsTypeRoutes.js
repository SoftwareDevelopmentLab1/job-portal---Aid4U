const express = require("express");
const { createJobType, allJobType, updateJobType, deleteJobType } = require("../controllers/jobsTypeController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router= express.Router();

//job type routes
router.post('/type/create', isAuthenticated, createJobType)

//for all jobs
router.get('/type/jobs', allJobType)
// upadte
router.put('/type/update/:type_id',isAuthenticated, isAdmin, updateJobType)


// delete jobs
router.get('/type/delete/:type_id',  isAuthenticated,isAdmin, deleteJobType)

module.exports = router;
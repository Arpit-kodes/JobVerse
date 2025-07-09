import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";

const router = express.Router();

// ✅ Create a job
router.post("/post", isAuthenticated, postJob);

// ✅ Get all jobs for users
router.get("/all-jobs",  getAllJobs); // 🔁 must match frontend

// ✅ Get all jobs posted by logged-in admin
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// ✅ Get single job
router.get("/get/:id", isAuthenticated, getJobById);

// ✅ Update job by ID
router.put("/update/:id", isAuthenticated, updateJob);

// ✅ Delete job by ID
router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;

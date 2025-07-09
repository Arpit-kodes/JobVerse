import { Job } from "../models/job.model.js";

// ✅ Admin posts a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title || !description || !requirements || !salary || !location ||
      !jobType || !experienceLevel || !position || !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const parsedSalary = Number(salary);

    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements.map(r => r.trim())
        : requirements.split(',').map(r => r.trim()),
      salary: parsedSalary,
      location,
      jobType,
      experienceLevel,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error while creating job:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// ✅ Student: Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error while fetching jobs:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// ✅ Student: Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("company")
      .populate("applications");

    if (!job) {
      return res.status(404).json({ message: "Job not found.", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error while getting job by ID:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ✅ Admin: Get jobs posted by this admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error in getAdminJobs:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ✅ Admin: Update job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found.", success: false });
    }

    if (job.created_by.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this job.", success: false });
    }

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    if (title) job.title = title;
    if (description) job.description = description;
    if (requirements) {
      job.requirements = Array.isArray(requirements)
        ? requirements.map(r => r.trim())
        : requirements.split(',').map(r => r.trim());
    }
    if (salary) job.salary = Number(salary);
    if (location) job.location = location;
    if (jobType) job.jobType = jobType;
    if (experienceLevel) job.experienceLevel = experienceLevel;
    if (position) job.position = position;
    if (companyId) job.company = companyId;

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error while updating job:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ✅ Admin: Delete job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found.", success: false });
    }

    if (job.created_by.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await job.deleteOne();

    return res.status(200).json({ message: "Job deleted successfully.", success: true });
  } catch (error) {
    console.error("Error while deleting job:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// ✅ Apply to a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(409).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.error("❌ Error in applyJob:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ Get all jobs the current user has applied to (candidate)
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" },
      });

    const validApplications = applications.filter((app) => app.job !== null);

    return res.status(200).json({
      application: validApplications,
      success: true,
    });
  } catch (error) {
    console.error("❌ Error in getAppliedJobs:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ Get all applicants for a job (admin)
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("❌ Error in getApplicants:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ Update application status (admin)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status; // ✅ FIXED: Title Case is preserved
    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error("❌ Error in updateStatus:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

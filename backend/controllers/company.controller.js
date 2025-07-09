import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ✅ Register a new company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required.", success: false });
    }

    const existing = await Company.findOne({ name: companyName });
    if (existing) {
      return res.status(400).json({ message: "Company already exists.", success: false });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ✅ Get all companies for the logged-in user
export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ✅ Get a single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found.", success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error("Error fetching company:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ✅ Update company info (with optional logo upload)
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    let logo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(website && { website }),
      ...(location && { location }),
      ...(logo && { logo }),
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found.", success: false });
    }

    return res.status(200).json({
      message: "Company updated successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// ✅ Delete a company and all associated jobs
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found.", success: false });
    }

    // Only allow the user who created the company to delete it
    if (company.userId.toString() !== req.id) {
      return res.status(403).json({ message: "Unauthorized action.", success: false });
    }

    // Delete all jobs associated with this company
    await Job.deleteMany({ company: company._id });

    // Delete the company
    await company.deleteOne();

    return res.status(200).json({
      message: "Company and all associated jobs deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};

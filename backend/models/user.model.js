import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    required: true
  },
  profile: {
    bio: { type: String, default: '' },
    skills: [{ type: String }],
    resume: { type: String, default: '' },                  // 📝 Stored as cloud/local URL
    resumeOriginalName: { type: String, default: '' },      // 📝 File original name
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    profilePhoto: { type: String, default: '' }             // 🖼️ Avatar image URL
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

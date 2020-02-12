const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    company: { type: String },
    companyUrl: { type: String },
    description: { type: String, minlength: 5 },
    contractType: {
      type: String,
      enum: ["part time job", "full time job", "freelance", ""]
    },
    industry: { type: String },
    category: { type: String, enum: ["Data", "UX/UI", "WebDev", ""] },
    location: {
      city: String,
      country: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    image: { type: String, default: "/images/loudspeaker.png" },
    startsAt: Date
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;

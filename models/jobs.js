const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    company: { type: String },
    companyUrl: { type: String },
    description: String,
    contractType: {
      type: String,
      enum: ["part time job", "full time job", "freelance"]
    },
    industry: { type: String, minlength: 200 },
    category: { type: String, enum: ["Data", "UX/UI", "WebDev"] },
    location: {
      city: String,
      country: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
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

/*
Job SCHEMA:

- title
- company {name, link}
- description : String
- industry: String
- category: enum [data, ux/ui, webdev]
- author: ref to user
- location { city, country}
- starts at: time
- created at: timestamp


*/

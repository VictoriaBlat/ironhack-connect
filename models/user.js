
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // admin sends invitation with just the email and the role (default: user)
    email: { type: String, require: true, unique: true },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
      require: true,
    },

    // user definitely has to set (not required in the schema, just in the form validation):
    name: { type: String },
    surname: { type: String },
    password: { type: String },
    activatedAt: { type: Date },
    activated: { type: Boolean, default: false }, // time when the user logged in the first time and saved his Name and Surname
    loggedIn: { type: Boolean, default: false }, //optional

    // minor important attributes
    image: { type: String, default: '/images/profile/no-image.jpg' },

    techStack: [
      {
        type: String,
      },
    ],

    cv: [
      {
        title: String,
        company: String,
        companyUrl: String,
        startDate: { type: Date },
        endDate: { type: Date },
        current: Boolean,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('User', userSchema);

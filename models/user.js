const mongoose = require('mongoose');

const User = mongoose.Schema({
	email: { type: String, require: true, unique: true },
});

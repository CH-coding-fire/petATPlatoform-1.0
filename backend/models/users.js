const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	nickname: {
		type: String,
		// require: true,
		unique: true,
	},

	contact: {
		type: String,
	},

	userId: {
		type: String,
		require: true,
	},

	openAdoptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

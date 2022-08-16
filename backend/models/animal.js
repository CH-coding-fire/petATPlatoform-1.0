const mongoose = require('mongoose');
const Users = require('../models/users');

const animalAgeSchema = new mongoose.Schema({
	years: String,
	months: String,
	days: String,
});

const ImageSchema = new mongoose.Schema({
	url: String,
	// filename: String,
});

ImageSchema.virtual('squareUrl').get(function () {
	return this.url.replace('/upload', '/upload/w_1000,ar_1:1,c_fill,g_auto');
});

const animalSchema = new mongoose.Schema({
	animalName: {
		type: String,
		// required: true,
	},
	animalClasses: {
		type: String,
		required: true,
		enum: [
			'mammals',
			'reptiles',
			'amphibians',
			'birds',
			'insectsOrInvertebrate',
			'fishOrAquatic',
			'plants',
			'others',
		],
	},

	animalGenera: {
		type: String,
		// required: true,
	},
	animalSpecies: {
		type: String,
		// required: true,
	},
	animalSpeciesName: {
		type: String,
		required: true,
	},
	animalSex: {
		type: String,
		required: true,
	},
	animalAge: {
		type: animalAgeSchema,
		required: true,
	},

	urgencyOptions: {
		type: String,
		enum: ['notUrgent', 'slightlyUrgent', 'urgent', 'mostUrgent'],
	},
	healthCondition: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		require: true,
	},
	requirementToAdopter: {
		type: String,
		require: true,
	},
	contactInfo: {
		type: String,
		required: true,
	},
	deliveryInfo: {
		type: String,
		required: true,
	},
	postDate: {
		type: Date,
		default: Date.now,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	amountOfLikes: {
		type: Number,
	},
	animalImages: {
		type: Array,
	},
	animalPrice: {
		type: Number,
	},
	// animalImages: [ImageSchema],
	latestRefreshDate: {
		type: Date,
		default: Date.now,
	},
	availableForAdoption: {
		type: Boolean,
		default: true
	},
	sellOrFreeOptions: {
		type: String,
		required: true,
	},
	adoptionSuccessful: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Animal', animalSchema);

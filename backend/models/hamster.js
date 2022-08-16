const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
	url: String,
	filename: String,
});

ImageSchema.virtual('squareUrl').get(function () {
	return this.url.replace('/upload', '/upload/w_1000,ar_1:1,c_fill,g_auto');
});

const hamsterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
		enum: [
			'倉鼠 > 熊仔鼠',
			'倉鼠 > 侏儒鼠> 三線鼠 > 布丁',
			'倉鼠 > 侏儒鼠> 三線鼠 > 銀狐',
			'倉鼠 > 侏儒鼠> 三線鼠 > 紫倉',
			'倉鼠 > 侏儒鼠> 三線鼠 > 小灰霸',
			'倉鼠 > 侏儒鼠 > 小路寶',
			'花枝鼠',
			'沙鼠',
		],
	},
	age: {
		type: String,
		required: true,
	},
	sex: {
		type: String,
		enum: ['雄性', '雌性'],
	},
	cageSizeMinimum: {
		type: String,
		require: true,
	},
	wheelSizeMinimum: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	requirementToAdopters: {
		type: String,
	},
	images: [ImageSchema],
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	postDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Hamster', hamsterSchema);

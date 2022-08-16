const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.v2.config({
	cloud_name: 'dr1uoiu01',
	api_key: '354123421176116',
	api_secret: 'ueIV9I4r_YKdhmf1Ap0Ujey0v2U',
});

// console.log(process.env.CLOUDINARY_CLOUD_NAME);

const storage = new CloudinaryStorage({
	cloudinary: cloudinary.v2,
	params: {
		folder: 'adoptions',
		allowedFormats: ['jpeg', 'png', 'jpg'],
	},
});

const tempImageStorage = new CloudinaryStorage({
	cloudinary: cloudinary.v2,
	params: {
		folder: 'tempImage',
		allowedFormats: ['jpeg', 'png', 'jpg'],
	},
});

module.exports = {
	cloudinary,
	storage,
	tempImageStorage
};

const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/users');
const { isLoggedIn } = require('../middleware');

router.route('/nicknameContact').post(isLoggedIn, async (req, res) => {
	const { nickname, contactInfo } = req.body;
	try {
		let user = await User.findOneAndUpdate(
			{ userId: req.user.id },
			{ contact: contactInfo, nickname: nickname }
		).then(() => {
			// console.log(user);
			console.log('update complete');
		});
	} catch (error) {
		console.log(error);
		res.send(error);
	}

	res.send('ok from server');
});

module.exports = router;

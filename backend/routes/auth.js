const passport = require('passport');
const Users = require('../models/users');
const router = require('express').Router();


// Run after it auth from google is successful
router.get('/login/success', async (req, res) => {
	console.log('REQ.USER:LOGIN/SUCCESS', req.user);
	if (req.user) {
		let user = await Users.find({ userId: req.user.id }).then(async (user) => {
			console.log('see if user param is passed', user);
			if (user.length !== 0) {
				console.log('this user has userId, he already registed!!');
			} else {
				console.log('this use is new... building new userId...');
				await Users.create({ userId: req.user.id });
			}
			// console.log('USER_NICK', user.[].nickname);
			res.status(200).json({
				success: true,
				// message: 'successful nice',
				thirdPartyUser: req.user,
				nickname: user[0].nickname,
				contact: user[0].contact,
				cookies: req.cookies,
			});
		});
	}
});

router.get('/login/failed', (req, res) => {
	console.log('login failed...');
	res.status(401).json({
		success: false,
		message: 'Login failure...',
	});
});

router.get('/logout', (req, res) => {
	console.log('REQ.USER:logout', req.user);
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: '/login/failed',
	})
);

// router.get('/facebook',
//   passport.authenticate('facebook'));

// router.get('/facebook/callback',
// 	passport.authenticate('facebook',
// 		{
// 			successRedirect: process.env.CLIENT_URL,
// 			failureRedirect: '/login'
// 		}),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

module.exports = router;

module.exports.isLoggedIn = (req, res, next) => {
	console.log('login?', req.isAuthenticated());
	if (!req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
};

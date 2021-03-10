const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
	if (res.locals.loggedIn) {
		res.cookie('ssid', res.locals.userRecord._id, { httpOnly: false });
		return next();
	} else {
		return next();
	}
};

module.exports = cookieController;

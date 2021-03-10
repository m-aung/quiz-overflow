const db = require('../models/quizModels');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
	if (res.locals.loggedIn) {
		const sessionTime = '10 minutes';
		const createSessionQuery = `INSERT INTO sessions (cookie_id, expire_by) VALUES (${res.locals.userRecord._id}, NOW() + interval '${sessionTime}')`;
		db.query(createSessionQuery, (err, queryRes) => {
			if (err) {
				console.log('err in createSessionQuery ', err);
				return next(err);
			} else {
				next();
			}
		});
	} else {
		return next();
	}
};

sessionController.isLoggedIn = (req, res, next) => {
	if (!isNaN(req.cookies.ssid)) {
		// if user has a SSID cookie that is a number then will check for active session
		const validSessionCheck = `SELECT * FROM sessions WHERE cookie_id = ${req.cookies.ssid} AND expire_by > NOW()`;
		db.query(validSessionCheck, (err, queryRes) => {
			if (err) {
				console.log('err in isLoggedIn ', err);
				return next(err);
			} else {
				if (queryRes.rows.length) {
					res.locals.cookieSessionMatch = true;
					return next();
				} else {
					res.locals.cookieSessionMatch = false;
					return next();
				}
			}
		});
	} else {
		res.locals.cookieSessionMatch = false;
		return next();
	}
};

module.exports = sessionController;

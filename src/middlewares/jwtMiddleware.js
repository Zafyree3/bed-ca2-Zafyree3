//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
/////////////////////////////////////////////////////
require("dotenv").config();

//////////////////////////////////////////////////////
// REQUIRE JWT MODULE
//////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////
// SET JWT CONFIGURATION
//////////////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
const refreshDuration = process.env.JWT_REFRESH_EXPIRES_IN;

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
//////////////////////////////////////////////////////

module.exports.handleNoToken = (req, res, next) => {
	if (req.headers.authorization == undefined) {
		res.locals.verification = false;
		res.locals.userId = 0;
	}

	next();
};

module.exports.generateToken = (req, res, next) => {
	const payload = {
		userId: res.locals.userId,
		timestamp: new Date(),
	};

	const options = {
		algorithm: tokenAlgorithm,
		expiresIn: tokenDuration,
	};

	const callback = (err, token) => {
		if (err) {
			console.error("Error jwt:", err);
			res.status(500).json(err);
		} else {
			res.locals.token = token;
			next();
		}
	};

	const token = jwt.sign(payload, secretKey, options, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.sendToken = (req, res, next) => {
	res.status(200).json({
		message: res.locals.message,
		token: res.locals.token,
		refresh: res.locals.refresh,
	});
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR REFRESHING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.refreshToken = (req, res, next) => {
	const refreshToken = req.body.refreshToken;

	if (!refreshToken) {
		return res.status(401).json({ error: "No refresh token provided" });
	}

	const callback = (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: "Invalid refresh token" });
		}

		res.locals.userId = decoded.userId;
		res.locals.tokenTimestamp = decoded.timestamp;

		next();
	};

	jwt.verify(refreshToken, refreshSecretKey, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR GENERATING REFRESH TOKEN
//////////////////////////////////////////////////////
module.exports.generateRefreshToken = (req, res, next) => {
	const payload = {
		userId: res.locals.userId,
		timestamp: new Date(),
	};

	const options = {
		algorithm: tokenAlgorithm,
		expiresIn: refreshDuration,
	};

	const callback = (err, token) => {
		if (err) {
			console.error("Error jwt:", err);
			res.status(500).json(err);
		} else {
			res.locals.refresh = token;
			next();
		}
	};

	const token = jwt.sign(payload, refreshSecretKey, options, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
//////////////////////////////////////////////////////
module.exports.verifyToken = (req, res, next) => {
	if (!res.locals.verification) {
		next();
		return;
	}

	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ error: "No token provided" });
	}

	const token = authHeader.substring(7);

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	const callback = (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: "Invalid token" });
		}

		res.locals.userId = decoded.userId;
		res.locals.tokenTimestamp = decoded.timestamp;

		next();
	};

	jwt.verify(token, secretKey, callback);
};

const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const tasksRouter = require("./taskRoutes");
const progressRouter = require("./progressRoutes");
const shopRouter = require("./shopRoutes");
const catRouter = require("./catRoutes");
const catOwnedRouter = require("./catOwnedRoutes");
const abilityRouter = require("./abilityRoutes");
const backyardRouter = require("./backyardRoutes");
const messagesRouter = require("./messagesRoutes");
const transactionRouter = require("./transactionRoutes");
const inventoryRouter = require("./inventoryRoutes");

router.use("/users", userRoutes);
router.use("/tasks", tasksRouter);
router.use("/task_progress", progressRouter);
router.use("/shop", shopRouter);
router.use("/cats", catRouter);
router.use("/owned", catOwnedRouter);
router.use("/ability", abilityRouter);
router.use("/backyard", backyardRouter);
router.use("/messages", messagesRouter);
router.use("/transactions", transactionRouter);
router.use("/inventory", inventoryRouter);

const tokenController = require("../controllers/tokenController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const pointsController = require("../controllers/pointsController");

router.post(
	"/register",
	userController.checkIfEmailIsUsed,
	userController.checkIfUsernameIsUsed,
	bcryptMiddleware.hashPassword,
	userController.registerUser,
	pointsController.createUserPointsRelRegister,
	jwtMiddleware.generateToken,
	jwtMiddleware.generateRefreshToken,
	jwtMiddleware.sendToken
);

router.post(
	"/login",
	userController.loginUser,
	bcryptMiddleware.comparePassword,
	jwtMiddleware.generateToken,
	jwtMiddleware.generateRefreshToken,
	jwtMiddleware.sendToken
);

router.post(
	"/refresh",
	jwtMiddleware.refreshToken,
	jwtMiddleware.generateToken,
	jwtMiddleware.generateRefreshToken,
	jwtMiddleware.sendToken
);

router.post(
	"/jwt/generate",
	tokenController.preTokenGenerate,
	jwtMiddleware.generateToken,
	tokenController.beforeSendToken,
	jwtMiddleware.sendToken
);
router.get(
	"/jwt/verify",
	jwtMiddleware.verifyToken,
	tokenController.showTokenVerified
);
router.post(
	"/bcrypt/compare",
	tokenController.preCompare,
	bcryptMiddleware.comparePassword,
	tokenController.showCompareSuccess
);
router.post(
	"/bcrypt/hash",
	bcryptMiddleware.hashPassword,
	tokenController.showHashing
);

module.exports = router;

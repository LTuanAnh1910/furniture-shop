const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.get("/verify/:token", authController.verifyEmail);

module.exports = router;

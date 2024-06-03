const router = require("express").Router();
const userController = require("../controllers/userController");

router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUser);
router.post("/address", userController.addAdress);
router.get("/address/:id", userController.getAddress);
router.put("/:id", userController.changeInfoUser);

module.exports = router;

const router = require("express").Router();

const HeartController = require("../controllers/heartController");
const { route } = require("./user");

router.get("/find/:id", HeartController.getCart);
router.post("/", HeartController.addToCart);
// router.post("/quantity", HeartController.decrementCartItem);
router.delete("/:cartItemId", HeartController.deleteCartItem);

module.exports = router;

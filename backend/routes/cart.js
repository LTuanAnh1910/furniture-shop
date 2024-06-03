const router = require("express").Router();

const CartController = require("../controllers/cartController");
const { route } = require("./user");

router.get("/find/:id", CartController.getCart);
router.post("/", CartController.addToCart);
router.post("/quantity", CartController.decrementCartItem);
router.delete("/:cartItemId", CartController.deleteCartItem);

module.exports = router;

const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.get("/getOrders", orderController.getAllOrders);
router.get("/:id", orderController.getUserOrders);
router.post("/", orderController.createOrder);
router.post("/buynow", orderController.buyNow);
// router.get("/getPrice", orderController.getMonthlyRevenue);

module.exports = router;

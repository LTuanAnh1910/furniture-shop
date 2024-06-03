const router = require("express").Router();
const paymentController = require("../controllers/paymentController");

router.post("/", paymentController.payment);
router.post("/callback", paymentController.callback);
router.post("/order-status/:app_trans_id", paymentController.checkPayment);

module.exports = router;

const router = require("express").Router();

const cmtController = require("../controllers/cmtController");

router.post("/addCmt", cmtController.addComment);
router.get("/:productId", cmtController.getComment);
module.exports = router;

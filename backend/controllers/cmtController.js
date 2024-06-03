const Comment = require("../models/Comment");
const Product = require("../models/Products");

module.exports = {
  addComment: async (req, res) => {
    const { productId, userId, username, text, rating } = req.body;

    try {
      const newComment = new Comment({
        productId,
        userId,
        username,
        text,
        rating,
      });
      const savedComment = await newComment.save();

      // Add the comment to the product
      await Product.findByIdAndUpdate(productId, {
        $push: { comments: savedComment._id },
      });

      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getComment: async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId).populate("comments");
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.status(200).json(product.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

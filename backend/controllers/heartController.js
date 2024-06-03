const Product = require("../models/Products");
const Heart = require("../models/Heart");

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
      const cart = await Heart.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );
        if (!existingProduct) {
          cart.products.push({
            cartItem,
          });
        }
        await cart.save();
        res.status(200).json("Product added to heart.");
      } else {
        const newCart = new Heart({
          userId,
          products: [
            {
              cartItem,
            },
          ],
        });
        await newCart.save();
        res.status(200).json("Product added to heart.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getCart: async (req, res) => {
    const userId = req.params.id;

    try {
      const cart = await Heart.find({ userId }).populate(
        "products.cartItem",
        "_id title supplier price imageUrl"
      );
      // console.log(cart);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCartItem: async (req, res) => {
    const cartItemId = req.params.cartItemId;
    try {
      const updateCart = await Heart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $pull: { products: { _id: cartItemId } } },
        { new: true }
      );
      if (!updateCart) {
        return res.status(404).json("Cart item not found");
      }

      res.status(200).json(updateCart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

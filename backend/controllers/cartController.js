const Product = require("../models/Products");
const Cart = require("../models/Cart");

module.exports = {
  addToCart: async (req, res) => {
    const { userId, cartItem, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        const existingProduct = cart.products.find(
          (product) => product.cartItem.toString() === cartItem
        );
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({
            cartItem,
            quantity: quantity,
          });
        }
        await cart.save();
        res.status(200).json("Product added to cart.");
      } else {
        const newCart = new Cart({
          userId,
          products: [
            {
              cartItem,
              quantity: 1,
            },
          ],
        });
        await newCart.save();
        res.status(200).json("Product added to cart.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getCart: async (req, res) => {
    const userId = req.params.id;

    try {
      const cart = await Cart.find({ userId }).populate(
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
      const updateCart = await Cart.findOneAndUpdate(
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
  decrementCartItem: async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json("Cart not found");
      }

      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );
      if (!existingProduct) {
        return res.status(404).json("Product not found");
      }

      if (existingProduct.quantity === 1) {
        cart.products = cart.products.filter(
          (product) => product.cartItem.toString() !== cartItem
        );
      } else {
        existingProduct.quantity -= 1;
      }

      await cart.save();

      if (existingProduct.quantity === 0) {
        await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
      }
      res.status(200).json("product updated successfully");
    } catch (error) {}
  },
};

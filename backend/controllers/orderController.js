const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Products = require("../models/Products");
const User = require("../models/User");

module.exports = {
  getUserOrders: async (req, res) => {
    const userId = req.params.id;

    try {
      const order = await Order.find({ userId }).populate(
        "products.cartItem",
        "_id title supplier price imageUrl"
      );
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  createOrder: async (req, res) => {
    try {
      const { userId, payment_status, shippingAddress } = req.body;

      const cart = await Cart.findOne({ userId }).populate("products.cartItem");
      console.log(cart);

      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ error: "Giỏ hàng trống!" });
      }

      const total = cart.products.reduce((acc, item) => {
        return acc + item.cartItem.price * item.quantity;
      }, 0);
      console.log(total);

      const newOrder = new Order({
        userId,
        products: cart.products.map((item) => ({
          cartItem: item.cartItem,
          quantity: item.quantity,
        })),
        total,
        payment_status,
        shippingAddress: shippingAddress,
        delivery_status: "Pending",
      });

      await newOrder.save();
      await Cart.deleteOne({ userId: cart.userId });
      res.status(200).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  buyNow: async (req, res) => {
    try {
      const { userId, productId, quantity, payment_status, shippingAddress } =
        req.body;

      const product = await Products.findById(productId);
      console.log(product);

      if (!product) {
        return res.status(404).json({ error: "Product not found!" });
      }

      const total = product.price * quantity;
      console.log(total);

      const newOrder = new Order({
        userId,
        products: [{ cartItem: productId, quantity }],
        total,
        delivery_status: "Pending",
        shippingAddress: shippingAddress,
        payment_status,
      });

      // Save the order to the database
      await newOrder.save();

      res.status(200).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({}).populate(
        "products.cartItem",
        "_id title supplier price imageUrl"
      );
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

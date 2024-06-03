const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        cartItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total: { type: Number, required: true },
    shippingAddress: {
      name: { type: String, required: true },
      mobileNo: { type: String, required: true },
      houseNo: { type: String, required: true },
      street: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
    },
    delivery_status: { type: String, default: "Pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

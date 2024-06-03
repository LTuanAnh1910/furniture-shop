const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const heartRouter = require("./routes/heart");
const commentRouter = require("./routes/comment");
const paymentRouter = require("./routes/payment");
const app = express();
const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoosedb connected"))
  .catch((err) => console.log("error", err));

const cors = require("cors");
const Order = require("./models/Order");
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", productRouter);
app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/heart", heartRouter);
app.use("/api/comment", commentRouter);
app.use("/api/payment", paymentRouter);

//get Revenue monthly
app.get("/api/revenue/monthly", async (req, res) => {
  try {
    const revenueStats = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$total" },
          totalOrders: { $sum: 1 },
          averageOrderValue: { $avg: "$total" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          totalRevenue: 1,
          totalOrders: 1,
          averageOrderValue: 1,
          _id: 0,
        },
      },
    ]);

    res.json(revenueStats);
  } catch (error) {
    console.error("Error fetching revenue statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

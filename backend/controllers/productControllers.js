const Product = require("../models/Products");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("product created succesfully");
    } catch (error) {
      res.status(200).json("product created failed");
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find().sort({ createAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(200).json("fail to get  products");
    }
  },

  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).exec();
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get product" });
    }
  },

  searchProduct: async (req, res) => {
    try {
      const result = await Product.aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);

      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "No products found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to search for products" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).send();
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  changeProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res.status(404).send();
      }
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

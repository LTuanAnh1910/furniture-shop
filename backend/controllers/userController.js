const User = require("../models/User");

module.exports = {
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Successfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(401).json("User does not exist");
      }

      const { password, __v, createAt, updateAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addAdress: async (req, res) => {
    try {
      const { userId, address } = req.body;

      //find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      //add a new address to the user's address array
      user.addresses.push(address);

      //sve the update user
      user.save();
      res.status(200).json({ message: "Address created Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Err addding address" });
    }
  },
  getAddress: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const addresses = user.addresses;
      res.status(200).json({ addresses });
    } catch (error) {
      res.status(500).json({ message: "Error retrieveing the addresses" });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  changeInfoUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

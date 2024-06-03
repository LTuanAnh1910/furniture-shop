const User = require("../models/User");

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "caomile19@gmail.com",
      pass: "zrom szrr cfol nngz",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "Shop house",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:3000/api/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("Email already registered:", email);
        return res.status(400).json({ message: "Email already registered" });
      }

      const newUser = new User({ name, email, password });

      newUser.verificationToken = crypto.randomBytes(20).toString("hex");

      await newUser.save();

      console.log("New User Registered:", newUser);

      sendVerificationEmail(newUser.email, newUser.verificationToken);

      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
    } catch (error) {
      console.log("Error during registration:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const token = req.params.token;

      const user = await User.findOne({ verificationToken: token });
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      }

      user.verified = true;
      user.verificationToken = undefined;

      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Email Verificatioion Failed" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      //check if the user exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      //check password is correct
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });

        //generate a token
      }
      const generateSecretKey = (req, res) => {
        const secretKey = crypto.randomBytes(32).toString("hex");
        return secretKey;
      };
      const secretKey = generateSecretKey();
      const token = jwt.sign({ userId: user._id }, secretKey);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "login failed" });
    }
  },
};

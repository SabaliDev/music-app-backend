import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const authController = {
  // Register a new user
  register: async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
      // Check if password is provided and not empty
      if (!password || password.trim() === "") {
        return res.status(400).json({ message: "Password is required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.json({ message: "Registration successful" });
    } catch (error) {
      next(error);
    }
  },

  // Login with an existing user
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email});
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await user.comparePassword(password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1 hour",
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
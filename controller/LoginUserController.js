// const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterUser = require("../models/RegisterUser");
const LoginUserController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Please fill all details",
        });
      }

      const user = await RegisterUser.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!user.password) {
        return res.status(400).json({
          message: "Password not set for this user",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Wrong password",
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT,
        { expiresIn: "2d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        id:user._id
      });

    } catch (error) {
      return res.status(500).json({
        message: "Failed to login",
        error: error.message,
      });
    }
  },
};
module.exports = LoginUserController;

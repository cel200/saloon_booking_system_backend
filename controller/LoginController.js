const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LoginController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(404).send("please fill the details");
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(404).json({
          message: "wrong password",
        });
      }
      const payload = {
        email: user.email,
        password: user.password,
      };
      const token = jwt.sign(payload, process.env.JWT, { expiresIn: "2d" });
      if (token) {
        return res.status(200).json({
          message: "admin login successfull",
          token,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Failed to login",
        error: error.message,
      });
    }
  },
};
module.exports = LoginController;

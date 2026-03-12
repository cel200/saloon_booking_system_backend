const RegisterUser = require("../models/RegisterUser");
 const bcrypt = require("bcrypt");
const RegisterUserController = {
   

registerUser: async (req, res) => {
  try {
    const { fullName, email, mobileNo, password } = req.body;

    const existinguser = await RegisterUser.findOne({ email });

    if (existinguser) {
      return res.status(400).json({
        message: "User already exists, please register with another email",
      });
    }

    // ✅ Hash Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Save Hashed Password
    const user = await RegisterUser.create({
      fullName,
      email,
      mobileNo,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
},
     getAllUsers: async (req, res) => {
    try {
      const users = await RegisterUser.find(); // fetch all users

      return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  },
}
module.exports = RegisterUserController;
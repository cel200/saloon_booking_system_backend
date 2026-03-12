const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URL);

  const adminEmail = "luxesaloon@admin.com";
  const adminPassword = "Admin@123";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log("Admin created successfully");
  process.exit();
}

createAdmin();

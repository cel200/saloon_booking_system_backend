

const express = require('express');
const router = express.Router();
const Admin = require('./Admin');


router.use("/admin", Admin);

module.exports = router;

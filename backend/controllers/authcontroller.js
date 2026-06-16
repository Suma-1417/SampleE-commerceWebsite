
let users=require('../models/usermodel')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
require('dotenv').config()
//registration
exports.register= async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role)
      return res.status(400).json({ msg: "missing fields" });

    let checkuser = await users.findOne({ username });
    if (checkuser) return res.status(409).json({ msg: "user already exists" });

    let hashpassword = await bcrypt.hash(password, 10);
    await users.create({ username, password: hashpassword, email, role });

    let payload = { username, emailaddress: email, role };
    let token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });

    await mail(email, username);
    return res.status(201).json({ msg: "Registration successful", token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

//login workflow
exports.login=async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.json({ msg: "missing fields" });
    let checkuser = await users.findOne({ username });
    if (!checkuser) return res.status(201).json({ msg: "user not found" });
    let ishashverified = await bcrypt.compare(password, checkuser.password);
    if (!ishashverified)
      return res.status(403).json({ msg: "username or password is invalid" });

    let payload = {
      username: checkuser.username,
      emailaddress: checkuser.email,
      role: checkuser.role,
    };
    let token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });

    res.json({ msg: "login successful", token });
  } catch (error) {
    next(error);
  }
}
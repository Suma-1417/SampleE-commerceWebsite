
const express = require("express");
const cors = require("cors");
// let bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
let limiter = require("./middlewares/ratelimit.js");
let connection = require("./config/db");

// let products = require("./models/productmodel");
// let users = require("./models/usermodel");
// let mail = require("./utils/gmail");
// let secretkey =process.env.SECRETKEY ;

//routes
let productroutes = require("./routes/productroute");
let authroutes = require("./routes/authroute");

const app = express();

const port = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/products", productroutes);
app.use("/", authroutes);

// app.get("/products", async (req, res) => {
//   try {
//     let allproducts = await products.find();
//     res.status(200).json(allproducts);
//   } catch (error) {
//     res.json({ msg: error.message });
//   }
// });

// app.post("/products", async (req, res) => {
//   try {
//     await products.create(req.body);
//     res.status(201).json({ msg: "product saved" });
//   } catch (error) {
//     res.json({ msg: error.message });
//   }
// });

// app.post("/bulkproducts", async (req, res) => {
//   try {
//     await products.insertMany(req.body);
//     res.status(201).json({ msg: "products are  saved" });
//   } catch (error) {
//     res.json({ msg: error.message });
//   }
// });

// app.put("/products/:id", async (req, res) => {
//   try {
//     let productid = req.params.id;
//     await products.findByIdAndUpdate(productid, req.body);
//     res.status(201).json({ msg: "product is updated" });
//   } catch (error) {
//     res.json({ msg: error.message });
//   }
// });

// app.delete("/products/:id", async (req, res) => {
//   try {
//     let productid = req.params.id;
//     await products.findByIdAndDelete(productid);
//     res.status(200).json({ msg: "product is deleted" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });
// //registration
// app.post("/register", async (req, res) => {
//   try {
//     const { username, password, email, role } = req.body;
//     if (!username || !password || !email || !role)
//       return res.status(400).json({ msg: "missing fields" });

//     let checkuser = await users.findOne({ username });
//     if (checkuser) return res.status(409).json({ msg: "user already exists" });

//     let hashpassword = await bcrypt.hash(password, 10);
//     await users.create({ username, password: hashpassword, email, role });

//     let payload = { username, emailaddress: email, role };
//     let token = jwt.sign(payload, secretkey, { expiresIn: "1h" });

//     await mail(email, username);
//     return res.status(201).json({ msg: "Registration successful", token });
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// });

// //login workflow
// app.post("/login", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) return res.json({ msg: "missing fields" });
//     let checkuser = await users.findOne({ username });
//     if (!checkuser) return res.status(201).json({ msg: "user not found" });
//     let ishashverified = await bcrypt.compare(password, checkuser.password);
//     if (!ishashverified)
//       return res.status(403).json({ msg: "username or password is invalid" });

//     let payload = {
//       username: checkuser.username,
//       emailaddress: checkuser.email,
//       role: checkuser.role,
//     };
//     let token = jwt.sign(payload, secretkey, { expiresIn: "1h" });

//     res.json({ msg: "login successful", token });
//   } catch (error) {
//     next(error);
//   }
// });

app.listen(port, () => {
  console.log(`server is running on ${port}`);
  connection();
});

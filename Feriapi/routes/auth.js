const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Product = require('../model/Products'); 
const { verifyTokenAndAuthorization } = require("./verifyToken");

// Registration route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the email already exists
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post("/createAdmin", async (req, res) => {
  const { username, email, password,isAdmin } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

    // Create a new admin user
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
      isAdmin: isAdmin, // Set isAdmin to true
    });

    // Save the new admin user to the database
    await newUser.save();

    res.status(201).json({ message: "Admin user created successfully!" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        
        if (!user) {
            return res.status(401).json({ error: "Wrong credentials" });
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        
        if (originalpassword !== req.body.password) {
            return res.status(401).json({ error: "Wrong credentials" });
            
        }
        const accessToken =jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,



        },process.env.JWT_SEC,
        {expiresIn:"3d"}
    
    );
        const { password, ...others } = user._doc; // Convert Mongoose document to plain object

        
    

        // Password and username match, send user data
        res.status(200).json({...others,accessToken});
    } catch (err) {
        // Handle unexpected errors
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/get', async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: 'user',
      model: 'User'
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//get all the users
router.get("/getuser",async (req,res)=>{
  const query=req.query.new
  try{
     const users= query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
      
      res.status(200).json(users);

  }catch(err){
      res.status(500).json(err)
  }

});
router.delete("/deleteUser/:id", async (req, res) => {
  console.log("router reached")
  const { id } = req.params;

  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;

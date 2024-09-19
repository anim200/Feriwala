const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const Product = require('../model/Products')
const {verifyTokenAndAuthorization} = require('../routes/verifyToken')

// Define the directory path
const uploadDir = path.join(__dirname, '..', 'public', 'productUpload');

// Ensure the directory exists before handling the upload
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureDirExists(uploadDir); // Create directory if it doesn't exist
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST route for uploading product images and creating a new product
router.post('/post', upload.fields([
  { name: 'photo0', maxCount: 1 },
  { name: 'photo1', maxCount: 1 },
  { name: 'photo2', maxCount: 1 },
  { name: 'photo3', maxCount: 1 },
  { name: 'photo4', maxCount: 1 }
]), async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const filenames = [];
    
    // Collect filenames from uploaded photos
    for (let i = 0; i < 5; i++) {
      const file = req.files[`photo${i}`];
      if (file) {
        filenames.push(`${baseUrl}/productUpload/${file[0].filename}`);
      }
    }
    console.log(filenames);

    // Extract common fields from request body
    console.log(req.body)
    const { user, categories } = req.body;

    // Extract category-specific fields
    console.log(categories)
    
    let categoryData = {};
    switch (categories) {
      case 'Electronics':
        categoryData = {
          brand: req.body.brand,
          model: req.body.model,
          warranty: req.body.warranty,
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      case 'Sports':
        categoryData = {
          brand: req.body.brand,
          type: req.body.type,
          size: req.body.size,
          weight: req.body.weight,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      case 'Clothings':
        categoryData = {
          brand: req.body.brand,
          type: req.body.type,
          size: req.body.size,
          material: req.body.material,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      case 'Medicines':
        categoryData = {
          medicine_name: req.body.medicine_name,
          dosage: req.body.dosage,
          expirationDate: req.body.expirationDate,
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      case 'Education':
        categoryData = {
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      case 'Accessories':
        categoryData = {
          accessoryType: req.body.accessoryType,
          brand: req.body.brand,
          compatibility: req.body.compatibility,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      case 'Cycle':
        categoryData = {
          brand: req.body.brand,
          model: req.body.model,
          type: req.body.type,
          frameMaterial: req.body.frameMaterial,
          wheelSize: req.body.wheelSize,
          brakeType: req.body.brakeType,
          gearSystem: req.body.gearSystem,
          weight: req.body.weight,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      case 'HomeLiving':
        categoryData = {
          item_name: req.body.item_name,
          brand: req.body.brand,
          material: req.body.material,
          dimensions: req.body.dimensions,
          weight: req.body.weight,
          color: req.body.color,
          style: req.body.style,
          roomType: req.body.roomType,
          price: req.body.price,
          description: req.body.description,
          images: filenames,
        };
        break;
      default:
        return res.status(400).json({ error: 'Invalid category selected' });
    }
  console.log(categoryData)
    // Create a new Product document with the gathered data
    const newProduct = new Product({
      user,
      categories,
      ...categoryData, // Spread the category-specific fields here
    });
    

    // Save the new product to the database
    const savedProduct = await newProduct.save();
    
    
    res.status(200).json({ product: savedProduct });
  } catch (error) {
    console.error('Error uploading product images:', error);
    res.status(500).json({ error: 'Error uploading product images' });
  }
});
//update product
router.put('/update/:id', async (req, res) => {
  try {
    console.log("router reached")
    const { id } = req.params; // Get the product ID from the URL
    const { user, categories } = req.body; // Extract common fields from the request body
    console.log(id);
    console.log(user);
    console.log(categories)

    // Extract category-specific fields
    let categoryData = {};
    switch (categories) {
      case 'Electronics':
        categoryData = {
          brand: req.body.brand,
          model: req.body.model,
          warranty: req.body.warranty,
          price: req.body.price,
          description: req.body.description,
        };
        break;
      case 'Sports':
        categoryData = {
          brand: req.body.brand,
          type: req.body.type,
          size: req.body.size,
          weight: req.body.weight,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
        };
        break;
      case 'Clothings':
        categoryData = {
          brand: req.body.brand,
          type: req.body.type,
          size: req.body.size,
          material: req.body.material,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
        };
        break;
      case 'Medicines':
        categoryData = {
          medicine_name: req.body.medicine_name,
          dosage: req.body.dosage,
          expirationDate: req.body.expirationDate,
          price: req.body.price,
          description: req.body.description,
        };
        break;
      case 'Education':
        categoryData = {
          price: req.body.price,
          description: req.body.description,
        };
        break;
      case 'Accessories':
        categoryData = {
          accessoryType: req.body.accessoryType,
          brand: req.body.brand,
          compatibility: req.body.compatibility,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
        };
        break;
      case 'Cycle':
        categoryData = {
          brand: req.body.brand,
          model: req.body.model,
          type: req.body.type,
          frameMaterial: req.body.frameMaterial,
          wheelSize: req.body.wheelSize,
          brakeType: req.body.brakeType,
          gearSystem: req.body.gearSystem,
          weight: req.body.weight,
          color: req.body.color,
          price: req.body.price,
          description: req.body.description,
        };
        break;
      case 'HomeLiving':
        categoryData = {
          item_name: req.body.item_name,
          brand: req.body.brand,
          material: req.body.material,
          dimensions: req.body.dimensions,
          weight: req.body.weight,
          color: req.body.color,
          style: req.body.style,
          roomType: req.body.roomType,
          price: req.body.price,
          description: req.body.description,
        };
        break;
      default:
        return res.status(400).json({ error: 'Invalid category selected' });
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        user,
        categories,
        ...categoryData,
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
});

router.get('/getpost', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('user', 'username profilePicture');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
router.get('/category/:categoryName', async (req, res) => {
  try {
    const products = await Product.find({ categories: req.params.categoryName }).populate('user', 'username profilePicture');
    if (!products.length) {
      return res.status(404).json({ msg: 'No products found for this category' });
    }
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
router.get('/getSearch', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).send('Query parameter is required');
    }

    // Initialize query object
    let queryObject = {};

    // Parse the query as a number
    const numericQuery = parseFloat(q);

    // Determine if the query is a price range or a text search
    if (!isNaN(numericQuery)) {
      // Handle numeric price ranges
      if (numericQuery < 1000) {
        queryObject.price = { $lt: 1000 };
      } else if (numericQuery >= 1000 && numericQuery <= 10000) {
        queryObject.price = { $gte: 1000, $lte: 10000 };
      } else if (numericQuery > 10000 && numericQuery <= 100000) {
        queryObject.price = { $gt: 10000, $lte: 100000 };
      } else if (numericQuery > 100000) {
        queryObject.price = { $gt: 100000 };
      }
    } else {
      // Handle text search
      const query = q.toLowerCase();
      queryObject = {
        $or: [
          { categories: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
          { type: { $regex: query, $options: 'i' } },
          { model: { $regex: query, $options: 'i' } },
          { accessoryType: { $regex: query, $options: 'i' } },
          { medicine_name: { $regex: query, $options: 'i' } }, // If item_name is also used
        ],
      };
    }

    // Fetch filtered products from the database
    const products = await Product.find(queryObject).populate('user', 'username profilePicture');

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});




router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;



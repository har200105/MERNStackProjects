const router = require('express').Router();
const Product = require("../models/Product");
const reqlogin = require('../middleware/reqlogin');
const reqadmin = require('../middleware/reqadmin');
const Category = require('../models/Category');


router.post("/", reqadmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(422).json(err);
  }
});

router.put("/:id", reqadmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(422).json(err);
  }
});


router.delete("/:id", reqadmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addCategory',async(req,res)=>{
   const cat  = Category(req.body);
   await cat.save().then((saved)=>{
     res.status(201).json(saved);
   })
});


router.get('/getCategory',async(req,res)=>{
  await Category.find({}).then((das)=>{
    res.status(201).json(das)
  })
});


router.get('/getProductByCat/:id',async(req,res)=>{
  await Product.find({category:req.params.id}).then((pro)=>{
    res.status(201).json(pro);
  })
});


router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(201).json(products);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
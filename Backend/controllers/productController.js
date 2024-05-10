import asyncHanlder from "../middlewares/asyncHandler.js";
import { Product } from "../models/productModel.js";

const createProduct = asyncHanlder(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    console.log(req.fields);
    console.log({ name, description, price, category, quantity, brand });
    switch (true) {
      case !name:
        return res.json({ message: "Name is required!" });
      case !brand:
        return res.json({ message: "Brand is required!" });
      case !description:
        return res.json({ message: "Description is required!" });
      case !price:
        return res.json({ message: "Price is required!" });
      case !category:
        return res.json({ message: "Category is required!" });
      case !quantity:
        return res.json({ message: "Quantity is required!" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.status(201).json({ data: product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});
const updateProduct = asyncHanlder(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    console.log(req.fields);
    // Validation
    switch (true) {
      case !name:
        return res.json({ message: "Name is required!" });
      case !brand:
        return res.json({ message: "Brand is required!" });
      case !description:
        return res.json({ message: "Description is required!" });
      case !price:
        return res.json({ message: "Price is required!" });
      case !category:
        return res.json({ message: "Category is required!" });
      case !quantity:
        return res.json({ message: "Quantity is required!" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHanlder(async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id);
    console.log(product);
    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const getProducts = asyncHanlder(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.status(200).json({
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

const getProductById = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });
  if (!product) {
    res.status(404).json({
      message: "Product not found!",
    });
  }

  res.status(200).json({ data: product });
});

const getAllProducts = asyncHanlder(async (req, res) => {
  const products = await Product.find({})
    .populate("category")
    .limit(12)
    .sort({ createdAt: -1 });

  res.status(200).json({ data: products });
});

const createProductReview = asyncHanlder(async (req, res) => {
  try {
    console.log(req.params.id);
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (product) {
      // find product has reviewed
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      //check if product already review
      if (alreadyReviewed) {
        res.status(400).json({ message: "Product already reviewed." });
      }
    }

    // create review
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    // assign number of review equal to length of reviews schema
    product.numReviews = product.reviews.length;

    // calculate rating by each rating of review
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(200).json({
      message: "Review Added!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error", error });
  }
});

const getTopProduct = asyncHanlder(async (req, res) => {
  try {
    const topProduct = await Product.find({}).sort({ rating: -1 }).limit(5);

    res.status(200).json({ data: topProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

const getNewProduct = asyncHanlder(async (req, res) => {
  try {
    const newestProduct = await Product.find().sort({ _id: -1 }).limit(5);

    res.status(200).json({ data: newestProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export {
  createProduct,
  createProductReview,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getAllProducts,
  getNewProduct,
  getTopProduct,
};

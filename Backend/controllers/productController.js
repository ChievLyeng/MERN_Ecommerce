import asyncHanlder from "../middlewares/asyncHandler.js";
import { Product } from "../models/productModel.js";

const createProduct = asyncHanlder(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
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
    const product = await Product.findByIdAndDelete(req.params.id);
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

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getAllProducts
};

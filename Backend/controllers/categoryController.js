import asyncHanlder from "../middlewares/asyncHandler.js";
import category from "../models/category.js";

const createCategory = asyncHanlder(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "name is required!" });
    }

    // if use.find it will go to create category then find it existed
    const existedCategory = await category.findOne({ name });

    if (existedCategory) {
      res.status(400).json({ message: "This category already exist!" });
    }

    const newCategory = await category({ name }).save();

    res.status(201).json({
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

const updateCategory = asyncHanlder(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const existedCategory = await category.findById({ _id: categoryId });

    if (!existedCategory) {
      res.status(400).json({ message: "Category not found!" });
    }
    existedCategory.name = req.body.name || existedCategory.name;
    const updatedCategory = await existedCategory.save();
    res.status(201).json({
      data: updatedCategory,
    });
  } catch (error) {
    res.json({ error });
  }
});

export { createCategory,updateCategory };

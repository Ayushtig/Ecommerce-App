import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


//creating the category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "category already exists",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error in category",
    });
  }
};

//updating the category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error while updating category",
    });
  }
};


//Listing all categories
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories list",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      message: "error getting all categories",
    });
  }
};


//Listing single category
export const singleCategoryController=async(req,res)=>{
    try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"single category found successfully",
            category
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            err,
            message:"error while getting single category"
        })
    }
}

//Deleting a category
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"delete category successful",
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            err,
            message:"delete category unsuccessful"
        })
    }
}
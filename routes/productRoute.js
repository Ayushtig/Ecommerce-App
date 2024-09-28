import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  singleProductController,
  productFiltersController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get-products
router.get("/get-product", getProductController);

//single-producct
router.get("/get-product/:slug", singleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post("/product-filter", productFiltersController);

//count products
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//product search
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid",relatedProductController)

//category wise route 
router.get("/product-category/:slug",productCategoryController)

//token route 
router.get("/braintree/token",braintreeTokenController)

//category wise route 
router.post("/braintree/payment",requireSignIn,braintreePaymentController)


export default router;

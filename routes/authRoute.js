import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//test
router.get("/test", requireSignIn, isAdmin, testController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile route
router.put("/profile", requireSignIn, updateProfileController);

//orders route
router.get("/orders", requireSignIn, getOrdersController);

//all orders route
router.get("/all-orders", requireSignIn,isAdmin ,getAllOrdersController);

//order status route
router.put("/order-status/:orderId", requireSignIn,isAdmin ,orderStatusController);

export default router;

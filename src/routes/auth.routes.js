import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router(); // Create a router instance

// AUTH ROUTES

router.post("/register", registerUser); // define route for user registration
router.post("/login", loginUser); // define route for user login
router.post("/logout", logoutUser); // define route for user logout

export default router;

import express from "express";
import authController from "../controllers/authController.js";

const authRouters = express.Router();

authRouters.post("/register", authController.register);
authRouters.post("/login", authController.login);

export default authRouters;

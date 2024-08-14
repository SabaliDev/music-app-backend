// import express from "express";
// import "dotenv/config";
import express from "express";
import userController from "../controllers/userController.js";
import authenticate from "../middlewares/auth.js";
const userRouter = express.Router();

userRouter.route("/profile", authenticate).get(userController.profile);

export default userRouter;

import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createUser);
router.put(
  "/",
  validateMyUserRequest,
  jwtCheck,
  jwtParse,
  MyUserController.updateCurrentUser
);
export default router;

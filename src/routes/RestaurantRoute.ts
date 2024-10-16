import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";
const router = express.Router();
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be valid string"),
  RestaurantController.searchRestaurant
);
router.get(
  "/:restaurantId",
  param("restuarantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("There should be valid restuarant Id"),
  RestaurantController.getRestaurant
);
export default router;

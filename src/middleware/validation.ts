import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
const handleVlaidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("please check the validations");
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("City must be as string"),
  body("country").isString().notEmpty().withMessage("City must be as string"),
  body("city").isString().notEmpty().withMessage("City must be as string"),
  handleVlaidationErrors,
];
export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Name must be a string"),
  body("city").notEmpty().withMessage("Name must be a string"),
  body("country").notEmpty().withMessage("Name must be a string"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Name must be a string"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Name must be a string"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be a string")
    .not()
    .isEmpty()
    .withMessage("Name must be a string"),
  body("menuItems").isArray().withMessage("  must be a string"),
  body("menuItems.*.name").notEmpty().withMessage("Name must be a string"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Name must be a string"),
  handleVlaidationErrors,
];

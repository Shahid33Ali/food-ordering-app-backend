import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
const handleVlaidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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

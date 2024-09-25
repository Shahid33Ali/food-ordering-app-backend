import { Request, Response } from "express";
import User from "../models/user";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      auth0Id: req.body.auth0Id,
    });
    if (user) {
      return res.json(user);
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ messahe: "there is an error" });
  }
};
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "front end not working" });
  }
};
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "THERE IS NO user" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "there is an error" });
  }
};
export default {
  createUser,
  updateCurrentUser,
  getCurrentUser,
};

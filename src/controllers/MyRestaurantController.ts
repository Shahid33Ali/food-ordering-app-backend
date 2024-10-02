import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestauarant = await Restaurant.findOne({
      user: req.userId,
    });
    if (existingRestauarant) {
      return res.status(409).json({ message: "User restauarnt aldredy exits" });
    }
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    const restauarnt = new Restaurant(req.body);
    restauarnt.imageUrl = uploadResponse.url;
    restauarnt.user = new mongoose.Types.ObjectId(req.userId);
    restauarnt.lastUpdated = new Date();
    await restauarnt.save();
    res.status(201).send(restauarnt);
  } catch (error) {
    console.log("there is a multer error");
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const user = await Restaurant.findOne({ user: req.userId });
    if (!user) {
      res.status(404).json({ message: "There is no restaurant" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: "there is an error" });
  }
};
const updateMyRestaurant = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findOne({ user: req.userId });
  if (!restaurant) {
    return res.status(404).json({ message: "There is an error" });
  }
  restaurant.restaurantName = req.body.restaurantName;
  restaurant.city = req.body.city;
  restaurant.country = req.body.country;
  restaurant.deliveryPrice = req.body.deliveryPrice;
  restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
  restaurant.cuisines = req.body.cuisines;
  restaurant.menuItems = req.body.menuItems;
  if (req.file) {
    const image = req.file as Express.Multer.File;
    const image64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${image64}`;
    const imageUrl = await cloudinary.v2.uploader.upload(dataURI);
    restaurant.imageUrl = imageUrl.url;
  }
  restaurant.lastUpdated = new Date();
  await restaurant.save();
  res.status(200).send(restaurant);
};
export { createMyRestaurant, getMyRestaurant, updateMyRestaurant };

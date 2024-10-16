import { Request, response, Response } from "express";
import Restaurant from "../models/restaurant";
const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;
    let query: any = {};
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck == 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }
    if (selectedCuisines) {
      const cuisinesArr = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));
      query["cuisines"] = { $all: cuisinesArr };
    }
    if (searchQuery) {
      const search = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: search },
        { cuisines: { $in: [search] } },
      ];
    }
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();
    const number = await Restaurant.countDocuments(query);
    const response = {
      data: restaurants,
      pagination: {
        total: number,
        page,
        pages: Math.ceil(number / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is an error" });
  }
};
const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "There is no restuarant of this id" });
    }
    return res.json(restaurant);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default {
  searchRestaurant,
  getRestaurant,
};

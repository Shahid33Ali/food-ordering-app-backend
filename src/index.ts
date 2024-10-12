import express, { Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/MyUserRoutes";
import restaurantsRouter from "./routes/RestaurantRoute";
import restaurantRouter from "./routes/MyRestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("hello there from db");
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Helath ok!" });
});
app.use("/api/my/user", userRouter);
app.use("/api/my/restaurant", restaurantRouter);
app.use("/api/restaurant", restaurantsRouter);
app.listen(7000, () => {
  console.log("server started on my port 7000");
});

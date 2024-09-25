import express, { Response, Request } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/MyUserRoutes";
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("hello there from db");
});
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Helath ok!" });
});
app.use("/api/my/user", userRouter);

app.listen(7000, () => {
  console.log("server started on my port 7000");
});

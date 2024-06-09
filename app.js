import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
const app = express();

config({
  path: "./data/config.env",
});
connectDb;
// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.get("/", (req, res) => {
  res.send("started");
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(
    `server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

import express from "express";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import chatRouter from "./routes/chatRoutes.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

// app.get("/", (req, res) => {
//   console.log("errri");
//   // res.send("helo")
//   throw new Error("Something went wrong"); //testing error middleware
// });

//routing
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

//error middleware
app.use(errorMiddleware);

export default app;

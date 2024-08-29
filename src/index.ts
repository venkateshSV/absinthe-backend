import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import connectDB from "./config/db";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import AuthRoutes from "./routes/AuthRoutes";
import HelloRoutes from "./routes/HelloRoutes";

const app: Application = express();

dotenv.config();

// connectDB();

app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
  })
);

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Absinthe Backend" });
});

// User Route
// app.use("/api/auth", AuthRoutes);
app.use("/api/hello", HelloRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));

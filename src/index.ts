import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { connectDB } from "./config/db";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import ApiKeyRoutes from "./routes/ApiKeyRoutes";
import PointsRoutes from "./routes/PointsRoutes";

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
app.use("/api/api-key", ApiKeyRoutes);
app.use("/api/points", PointsRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));

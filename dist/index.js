"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import { connectDB } from "./config/db";
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const HelloRoutes_1 = __importDefault(require("./routes/HelloRoutes"));
const ApiKeyRoutes_1 = __importDefault(require("./routes/ApiKeyRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// connectDB();
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: "*",
}));
// Default
app.get("/api", (req, res) => {
    res.status(201).json({ message: "Welcome to Absinthe Backend" });
});
// User Route
app.use("/api/hello", HelloRoutes_1.default);
app.use("/api/api-key", ApiKeyRoutes_1.default);
// Middleware
app.use(ErrorMiddleware_1.notFound);
app.use(ErrorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
//# sourceMappingURL=index.js.map
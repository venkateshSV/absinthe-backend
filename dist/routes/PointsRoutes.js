"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PointsController_1 = require("../controllers/PointsController");
const router = express_1.default.Router();
router.route("/distribute").post(PointsController_1.distributePoints);
router
    .route("/getPointsData/:apiKey/:projectId")
    .get(PointsController_1.getPointsDataUsingProjectId);
exports.default = router;
//# sourceMappingURL=PointsRoutes.js.map
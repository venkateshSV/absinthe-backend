import express from "express";
import {
  distributePoints,
  getPointsDataUsingProjectId,
} from "../controllers/PointsController";

const router = express.Router();

router.route("/distribute").post(distributePoints);
router
  .route("/getPointsData/:apiKey/:projectId")
  .get(getPointsDataUsingProjectId);

export default router;

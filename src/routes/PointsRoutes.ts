import express from "express";
import {
  distributePoints,
  getPointsDataUsingProjectId,
  getPointsDataUsingWalletAddress,
  getPointsDataUsingWalletAddressEventName,
} from "../controllers/PointsController";

const router = express.Router();

router.route("/distribute").post(distributePoints);
router
  .route("/get-points-data/:apiKey/:projectId")
  .get(getPointsDataUsingProjectId);
router
  .route("/get-points-data/:apiKey/:projectId/:walletAddress")
  .get(getPointsDataUsingWalletAddress);
router
  .route("/get-points-data/:apiKey/:projectId/:walletAddress/:eventName")
  .get(getPointsDataUsingWalletAddressEventName);

export default router;

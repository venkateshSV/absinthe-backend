import express from "express";
import {
  createApiKey,
  createProjectUsingApiKey,
  getProjectsUsingApiKey,
  validApiKey,
} from "../controllers/ApiKeyController";

const router = express.Router();

router.route("/create").post(createApiKey);
router.route("/valid").post(validApiKey);
router.route("/project/create").post(createProjectUsingApiKey);
router.route("/get-all-projects/:apiKey").get(getProjectsUsingApiKey);
export default router;

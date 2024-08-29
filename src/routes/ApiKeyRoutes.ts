import express from "express";
import {
  createApiKey,
  createProjectUsingApiKey,
  getProjectsUsingApiKey,
} from "../controllers/ApiKeyController";

const router = express.Router();

router.route("/create").post(createApiKey);
router.route("/project/create").post(createProjectUsingApiKey);
router.route("/get-all-projects/:apiKey").get(getProjectsUsingApiKey);
export default router;

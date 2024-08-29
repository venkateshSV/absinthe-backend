"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiKeyController_1 = require("../controllers/ApiKeyController");
const router = express_1.default.Router();
router.route("/create").post(ApiKeyController_1.createApiKey);
router.route("/project/create").post(ApiKeyController_1.createProjectUsingApiKey);
router.route("/get-all-projects/:apiKey").get(ApiKeyController_1.getProjectsUsingApiKey);
exports.default = router;
//# sourceMappingURL=ApiKeyRoutes.js.map
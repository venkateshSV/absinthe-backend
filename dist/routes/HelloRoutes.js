"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HelloController_1 = require("../controllers/HelloController");
const router = express_1.default.Router();
router.route("/").get(HelloController_1.sayHello);
exports.default = router;
//# sourceMappingURL=HelloRoutes.js.map
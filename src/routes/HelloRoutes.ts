import express from "express";
import { sayHello } from "../controllers/HelloController";

const router = express.Router();

router.route("/").get(sayHello);
export default router;

import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// @Desc Get all users
// @Route /api/auth
// @Method GET
export const sayHello = asyncHandler(async (req: Request, res: Response) => {
  res.status(201).json({ success: true, message: "Hellooooo!" });
});

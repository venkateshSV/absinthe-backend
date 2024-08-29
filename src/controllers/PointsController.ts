import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { checkApiKey, checkProjectId } from "../utils/utils";
import { sql } from "@vercel/postgres";
import { checkApiKeyProjectIdResponse, pointsdataResponse } from "types";
import { ethers } from "ethers";

// @Desc Distribute Points
// @Route /api/points/distribute
// @Method POST

export const distributePoints = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.body.apiKey;
      const projectId = req.body.projectId;
      let walletAddress = req.body.walletAddress;
      const eventName = req.body.eventName;
      const points = req.body.points;

      if (!apiKey || !projectId || !walletAddress || !eventName || !points) {
        res.status(404).json({
          error: `${!apiKey ? "API Key, " : ""}${
            !projectId ? "Project Id" : ""
          }${!walletAddress ? "Wallet Address, " : ""}${
            !eventName ? "Event Name, " : ""
          }${!points ? "Points, " : ""} Not entered`,
        });
        return;
      }
      if (!ethers.utils.isAddress(walletAddress)) {
        res.status(400).json({ error: "Invalid Wallet Address" });
        return;
      }
      walletAddress = ethers.utils.getAddress(walletAddress);
      const keyAndProjectResult: checkApiKeyProjectIdResponse =
        await checkProjectId(apiKey, projectId);
      if (!keyAndProjectResult.id) {
        res.status(400).json({ error: "API Key & Project Id does not match" });
        return;
      }
      const result =
        await sql`INSERT INTO pointsdata(project_id,event_name,wallet_address,points) VALUES(${projectId},${eventName},${walletAddress},${points}) RETURNING * `;
      res.status(201).json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
);

// @Desc Get all Points using given Project Id
// @Route /api/points/get-points-data/:apiKey/:projectId
// @Method GET
export const getPointsDataUsingProjectId = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.params.apiKey;
      const projectId = req.params.projectId;

      if (apiKey === ":apiKey") {
        res.status(404).json({ error: "API Key not entered" });
        return;
      }
      if (projectId === ":projectId") {
        res.status(404).json({ error: "Project Id not entered" });
        return;
      }
      const keyAndProjectResult: checkApiKeyProjectIdResponse =
        await checkProjectId(apiKey, projectId);
      if (!keyAndProjectResult.id) {
        res.status(400).json({ error: "API Key & Project Id does not match" });
        return;
      }
      const result =
        await sql`SELECT * FROM pointsdata WHERE project_id = ${projectId}`;
      const projects: pointsdataResponse[] = [];
      result.rows.map((project: pointsdataResponse) => {
        projects.push(project);
      });
      res.status(201).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
);

// @Desc Get all Points using given Project Id and WalletAddress
// @Route /api/points/get-points-data/:apiKey/:projectId/:walletAddress
// @Method GET
export const getPointsDataUsingWalletAddress = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.params.apiKey;
      const projectId = req.params.projectId;
      const walletAddress = req.params.walletAddress;
      if (apiKey === ":apiKey") {
        res.status(404).json({ error: "API Key not entered" });
        return;
      }
      if (projectId === ":projectId") {
        res.status(404).json({ error: "Project Id not entered" });
        return;
      }
      if (walletAddress === ":walletAddress") {
        res.status(404).json({ error: "Wallet Address not entered" });
        return;
      }
      const keyAndProjectResult: checkApiKeyProjectIdResponse =
        await checkProjectId(apiKey, projectId);
      if (!keyAndProjectResult.id) {
        res.status(400).json({ error: "API Key & Project Id does not match" });
        return;
      }
      const result =
        await sql`SELECT * FROM pointsdata WHERE project_id = ${projectId} AND wallet_address = ${walletAddress}`;
      const pointsResult = await sql`
        SELECT SUM(points) AS total_points
        FROM pointsdata
        WHERE project_id = ${projectId} AND wallet_address = ${walletAddress}
      `;

      const totalPoints = pointsResult.rows[0].total_points || 0;
      const projects: pointsdataResponse[] = [];
      result.rows.map((project: pointsdataResponse) => {
        projects.push(project);
      });
      res.status(201).json({
        success: true,
        data: projects,
        totalPoints: totalPoints,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
);

// @Desc Get all Points using given Project Id and WalletAddress
// @Route /api/points/get-points-data/:apiKey/:projectId/:walletAddress
// @Method GET
export const getPointsDataUsingWalletAddressEventName = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.params.apiKey;
      const projectId = req.params.projectId;
      const walletAddress = req.params.walletAddress;
      const eventName = req.params.eventName;
      if (apiKey === ":apiKey") {
        res.status(404).json({ error: "API Key not entered" });
        return;
      }
      if (projectId === ":projectId") {
        res.status(404).json({ error: "Project Id not entered" });
        return;
      }
      if (walletAddress === ":walletAddress") {
        res.status(404).json({ error: "Wallet Address not entered" });
        return;
      }
      if (eventName === ":eventName") {
        res.status(404).json({ error: "Event Name not entered" });
        return;
      }
      const keyAndProjectResult: checkApiKeyProjectIdResponse =
        await checkProjectId(apiKey, projectId);
      if (!keyAndProjectResult.id) {
        res.status(400).json({ error: "API Key & Project Id does not match" });
        return;
      }
      const result =
        await sql`SELECT * FROM pointsdata WHERE project_id = ${projectId} AND wallet_address = ${walletAddress} AND event_name = ${eventName}`;
      const pointsResult = await sql`
        SELECT SUM(points) AS total_points
        FROM pointsdata
        WHERE project_id = ${projectId} AND wallet_address = ${walletAddress} AND event_name = ${eventName}
      `;

      const totalPoints = pointsResult.rows[0].total_points || 0;
      const projects: pointsdataResponse[] = [];
      result.rows.map((project: pointsdataResponse) => {
        projects.push(project);
      });
      res.status(201).json({
        success: true,
        data: projects,
        totalPoints: totalPoints,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
);

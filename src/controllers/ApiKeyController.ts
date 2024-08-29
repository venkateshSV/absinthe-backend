import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");

import { sql } from "@vercel/postgres";

// @Desc Create an API Key
// @Route /api/api-key/create
// @Method POST
export const createApiKey = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.body.apiKey;
      if (!apiKey) {
        res.status(404);
        throw new Error("API Key not entered");
      }

      const result =
        await sql`INSERT INTO api_keys(api_key) VALUES(${apiKey}) RETURNING * `;

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

// @Desc Create an Project using given API Key
// @Route /api/api-key/project/create
// @Method POST
export const createProjectUsingApiKey = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.body.apiKey;
      if (!apiKey) {
        res.status(404);
        throw new Error("API Key not entered");
      }
      const result =
        await sql`SELECT * FROM api_keys WHERE api_key = ${apiKey}`;

      if (result.rowCount === 0) {
        res.status(400).json({ error: "API Key not found" });
        return;
      }
      const uuid = uuidv4();
      let insertResult;
      if (!result.rows[0].project_id) {
        insertResult = await sql`
        UPDATE api_keys SET project_id = ${uuid} WHERE api_key = ${apiKey} RETURNING *`;
      } else {
        insertResult = await sql`
        INSERT INTO api_keys (api_key, project_id)
        VALUES (${apiKey}, ${uuid}) RETURNING *`;
      }
      res.status(201).json({
        success: true,
        data: insertResult.rows[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
);

// @Desc Get all Projects using given API Key
// @Route /api/api-key/get-all-projects/:apiKey
// @Method GET
export const getProjectsUsingApiKey = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.params.apiKey;
      if (!apiKey) {
        res.status(404);
        throw new Error("API Key not entered");
      }
      const result =
        await sql`SELECT project_id FROM api_keys WHERE api_key = ${apiKey}`;

      if (result.rowCount === 0) {
        res.status(400).json({ error: "API Key not found" });
        return;
      }
      const projects: any = [];
      result.rows.map((project) => {
        projects.push(project.project_id);
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

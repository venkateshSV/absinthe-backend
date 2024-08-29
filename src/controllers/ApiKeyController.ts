import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { checkApiKey } from "../utils/utils";
const { v4: uuidv4 } = require("uuid");

import { sql } from "@vercel/postgres";
import { checkApiKeyProjectIdResponse } from "types";

// @Desc Create an API Key
// @Route /api/api-key/create
// @Method POST
export const createApiKey = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const apiKey = req.body.apiKey;
      if (!apiKey) {
        res.status(404).json({ error: "API Key not entered" });
        return;
      }
      const keyResult: checkApiKeyProjectIdResponse = await checkApiKey(apiKey);
      if (!keyResult.id) {
        const result =
          await sql`INSERT INTO api_keys(api_key) VALUES(${apiKey}) RETURNING * `;

        res.status(201).json({
          success: true,
          data: result.rows[0],
        });
      } else {
        res.status(403).json({ error: "Provided API key already exists" });
        return;
      }
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
        res.status(404).json({ error: "API Key not entered" });
        return;
      }
      const result: checkApiKeyProjectIdResponse = await checkApiKey(apiKey);
      if (!result.id) {
        res.status(400).json({ error: "API Key not found" });
        return;
      }
      const uuid = uuidv4();
      let insertResult;
      if (!result.project_id) {
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
      if (apiKey === ":apiKey") {
        res.status(404).json({ error: "API Key not entered" });
        return;
      }
      const keyResult: checkApiKeyProjectIdResponse = await checkApiKey(apiKey);
      if (!keyResult.id) {
        res.status(400).json({ error: "API Key not found" });
        return;
      }
      const result =
        await sql`SELECT project_id FROM api_keys WHERE api_key = ${apiKey}`;

      const projects: String[] = [];
      result.rows.map((project) => {
        projects.push(project.project_id?.toString());
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

import { sql } from "@vercel/postgres";
import {
  checkApiKeyProjectIdResponse,
  checkWalletResponse,
} from "../types/types";
import { ethers } from "ethers";

// Util function to check if the API key entered exists in the database
export const checkApiKey = async (
  apiKey: string
): Promise<checkApiKeyProjectIdResponse> => {
  try {
    const result = await sql`SELECT * FROM api_keys WHERE api_key = ${apiKey}`;
    let res: checkApiKeyProjectIdResponse = {
      id: null,
      api_key: "",
    };
    if (result.rowCount === 0) {
      return res;
    }
    res = {
      id: result.rows[0].id,
      api_key: result.rows[0].api_key,
      project_id: result.rows[0].project_id,
      created_at: result.rows[0].created_at,
    };
    return res;
  } catch (error: any) {
    throw error;
  }
};

// Util function to check if the API key and ProjectId entered exists in the database
export const checkProjectId = async (
  apiKey: string,
  projectId: string
): Promise<checkApiKeyProjectIdResponse> => {
  try {
    const result =
      await sql`SELECT * FROM api_keys WHERE api_key = ${apiKey} AND project_id = ${projectId}`;
    let res: checkApiKeyProjectIdResponse = {
      id: null,
      api_key: "",
    };
    if (result.rowCount === 0) {
      return res;
    }
    res = {
      id: result.rows[0].id,
      api_key: result.rows[0].api_key,
      project_id: result.rows[0].project_id,
      created_at: result.rows[0].created_at,
    };
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const checkWallet = (wallet_address: string): checkWalletResponse => {
  try {
    const valid = ethers.utils.isAddress(wallet_address);
    let res: checkWalletResponse = {
      valid: valid,
    };
    if (valid) {
      res.wallet_address = ethers.utils.getAddress(wallet_address);
    }
    return res;
  } catch (error: any) {
    throw error;
  }
};

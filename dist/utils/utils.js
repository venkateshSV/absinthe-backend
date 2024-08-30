"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWallet = exports.checkProjectId = exports.checkApiKey = void 0;
const postgres_1 = require("@vercel/postgres");
const ethers_1 = require("ethers");
// Util function to check if the API key entered exists in the database
const checkApiKey = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `SELECT * FROM api_keys WHERE api_key = ${apiKey}`;
        let res = {
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
    }
    catch (error) {
        throw error;
    }
});
exports.checkApiKey = checkApiKey;
// Util function to check if the API key and ProjectId entered exists in the database
const checkProjectId = (apiKey, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `SELECT * FROM api_keys WHERE api_key = ${apiKey} AND project_id = ${projectId}`;
        let res = {
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
    }
    catch (error) {
        throw error;
    }
});
exports.checkProjectId = checkProjectId;
const checkWallet = (wallet_address) => {
    try {
        const valid = ethers_1.ethers.utils.isAddress(wallet_address);
        let res = {
            valid: valid,
        };
        if (valid) {
            res.wallet_address = ethers_1.ethers.utils.getAddress(wallet_address);
        }
        return res;
    }
    catch (error) {
        throw error;
    }
};
exports.checkWallet = checkWallet;
//# sourceMappingURL=utils.js.map
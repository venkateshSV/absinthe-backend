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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectsUsingApiKey = exports.createProjectUsingApiKey = exports.validApiKey = exports.createApiKey = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");
const postgres_1 = require("@vercel/postgres");
// @Desc Create an API Key
// @Route /api/api-key/create
// @Method POST
exports.createApiKey = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = uuidv4();
        const result = yield (0, postgres_1.sql) `INSERT INTO api_keys(api_key) VALUES(${apiKey}) RETURNING * `;
        res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error });
    }
}));
// @Desc Check Valid API Key
// @Route /api/api-key/valid
// @Method POST
exports.validApiKey = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.body.apiKey;
        if (!apiKey) {
            res.status(400).json({ success: false, error: "API Key not entered" });
            return;
        }
        const result = yield (0, utils_1.checkApiKey)(apiKey);
        if (!result.id) {
            res.status(404).json({ success: false, error: "API Key not found" });
            return;
        }
        res.status(201).json({
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error });
    }
}));
// @Desc Create an Project using given API Key
// @Route /api/api-key/project/create
// @Method POST
exports.createProjectUsingApiKey = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.body.apiKey;
        if (!apiKey) {
            res.status(400).json({ success: false, error: "API Key not entered" });
            return;
        }
        const result = yield (0, utils_1.checkApiKey)(apiKey);
        if (!result.id) {
            res.status(404).json({ success: false, error: "API Key not found" });
            return;
        }
        const uuid = uuidv4();
        let insertResult;
        if (!result.project_id) {
            insertResult = yield (0, postgres_1.sql) `
        UPDATE api_keys SET project_id = ${uuid} WHERE api_key = ${apiKey} RETURNING *`;
        }
        else {
            insertResult = yield (0, postgres_1.sql) `
        INSERT INTO api_keys (api_key, project_id)
        VALUES (${apiKey}, ${uuid}) RETURNING *`;
        }
        res.status(201).json({
            success: true,
            data: insertResult.rows[0],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error });
    }
}));
// @Desc Get all Projects using given API Key
// @Route /api/api-key/get-all-projects/:apiKey
// @Method GET
exports.getProjectsUsingApiKey = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.params.apiKey;
        if (apiKey === ":apiKey") {
            res.status(400).json({ success: false, error: "API Key not entered" });
            return;
        }
        const keyResult = yield (0, utils_1.checkApiKey)(apiKey);
        if (!keyResult.id) {
            res.status(404).json({ success: false, error: "API Key not found" });
            return;
        }
        const result = yield (0, postgres_1.sql) `SELECT project_id FROM api_keys WHERE api_key = ${apiKey}`;
        const projects = [];
        result.rows.map((project) => {
            var _a;
            projects.push((_a = project.project_id) === null || _a === void 0 ? void 0 : _a.toString());
        });
        res.status(201).json({
            success: true,
            data: projects,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error });
    }
}));
//# sourceMappingURL=ApiKeyController.js.map
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
exports.getPointsDataUsingWalletAddressEventName = exports.getPointsDataUsingWalletAddress = exports.getPointsDataUsingProjectId = exports.distributePoints = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils/utils");
const postgres_1 = require("@vercel/postgres");
// @Desc Distribute Points
// @Route /api/points/distribute
// @Method POST
exports.distributePoints = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.body.apiKey;
        const projectId = req.body.projectId;
        let walletAddress = req.body.walletAddress;
        const eventName = req.body.eventName;
        const points = req.body.points;
        if (!apiKey || !projectId || !walletAddress || !eventName || !points) {
            res.status(404).json({
                success: false,
                error: `${!apiKey ? "API Key, " : ""}${!projectId ? "Project Id" : ""}${!walletAddress ? "Wallet Address, " : ""}${!eventName ? "Event Name, " : ""}${!points ? "Points, " : ""} Not entered`,
            });
            return;
        }
        if (!(0, utils_1.checkWallet)(walletAddress).valid) {
            res
                .status(400)
                .json({ success: false, error: "Invalid Wallet Address" });
            return;
        }
        walletAddress = (0, utils_1.checkWallet)(walletAddress).wallet_address;
        const keyAndProjectResult = yield (0, utils_1.checkProjectId)(apiKey, projectId);
        if (!keyAndProjectResult.id) {
            res.status(400).json({
                success: false,
                error: "API Key & Project Id does not match",
            });
            return;
        }
        const result = yield (0, postgres_1.sql) `INSERT INTO pointsdata(project_id,event_name,wallet_address,points) VALUES(${projectId},${eventName},${walletAddress},${points}) RETURNING * `;
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
// @Desc Get all Points using given Project Id
// @Route /api/points/get-points-data/:apiKey/:projectId
// @Method GET
exports.getPointsDataUsingProjectId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.params.apiKey;
        const projectId = req.params.projectId;
        if (apiKey === ":apiKey") {
            res.status(404).json({ success: false, error: "API Key not entered" });
            return;
        }
        if (projectId === ":projectId") {
            res
                .status(404)
                .json({ success: false, error: "Project Id not entered" });
            return;
        }
        const keyAndProjectResult = yield (0, utils_1.checkProjectId)(apiKey, projectId);
        if (!keyAndProjectResult.id) {
            res.status(400).json({
                success: false,
                error: "API Key & Project Id does not match",
            });
            return;
        }
        const result = yield (0, postgres_1.sql) `SELECT * FROM pointsdata WHERE project_id = ${projectId}`;
        const projects = [];
        result.rows.map((project) => {
            projects.push(project);
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
// @Desc Get all Points using given Project Id and WalletAddress
// @Route /api/points/get-points-data/:apiKey/:projectId/:walletAddress
// @Method GET
exports.getPointsDataUsingWalletAddress = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.params.apiKey;
        const projectId = req.params.projectId;
        let walletAddress = req.params.walletAddress;
        if (apiKey === ":apiKey") {
            res.status(404).json({ success: false, error: "API Key not entered" });
            return;
        }
        if (projectId === ":projectId") {
            res
                .status(404)
                .json({ success: false, error: "Project Id not entered" });
            return;
        }
        if (walletAddress === ":walletAddress") {
            res
                .status(404)
                .json({ success: false, error: "Wallet Address not entered" });
            return;
        }
        if (!(0, utils_1.checkWallet)(walletAddress).valid) {
            res
                .status(400)
                .json({ success: false, error: "Invalid Wallet Address" });
            return;
        }
        walletAddress = (0, utils_1.checkWallet)(walletAddress).wallet_address;
        const keyAndProjectResult = yield (0, utils_1.checkProjectId)(apiKey, projectId);
        if (!keyAndProjectResult.id) {
            res.status(400).json({
                success: false,
                error: "API Key & Project Id does not match",
            });
            return;
        }
        const result = yield (0, postgres_1.sql) `SELECT * FROM pointsdata WHERE project_id = ${projectId} AND wallet_address = ${walletAddress}`;
        let totalPoints = 0;
        const projects = [];
        result.rows.map((project) => {
            totalPoints = totalPoints + Number(project.points);
            projects.push(project);
        });
        res.status(201).json({
            success: true,
            data: projects,
            totalPoints: totalPoints,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error });
    }
}));
// @Desc Get all Points using given Project Id and WalletAddress
// @Route /api/points/get-points-data/:apiKey/:projectId/:walletAddress
// @Method GET
exports.getPointsDataUsingWalletAddressEventName = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = req.params.apiKey;
        const projectId = req.params.projectId;
        let walletAddress = req.params.walletAddress;
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
        if (!(0, utils_1.checkWallet)(walletAddress).valid) {
            res
                .status(400)
                .json({ success: false, error: "Invalid Wallet Address" });
            return;
        }
        walletAddress = (0, utils_1.checkWallet)(walletAddress).wallet_address;
        const keyAndProjectResult = yield (0, utils_1.checkProjectId)(apiKey, projectId);
        if (!keyAndProjectResult.id) {
            res.status(400).json({ error: "API Key & Project Id does not match" });
            return;
        }
        const result = yield (0, postgres_1.sql) `SELECT * FROM pointsdata WHERE project_id = ${projectId} AND wallet_address = ${walletAddress} AND event_name = ${eventName}`;
        let totalPoints = 0;
        const projects = [];
        result.rows.map((project) => {
            totalPoints = totalPoints + Number(project.points);
            projects.push(project);
        });
        res.status(201).json({
            success: true,
            data: projects,
            totalPoints: totalPoints,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}));
//# sourceMappingURL=PointsController.js.map
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
exports.hostController = void 0;
const host_service_1 = require("./host.service");
const createHost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const host = yield host_service_1.hostService.createHost(req.body);
        res.status(201).json(host);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const getAllHosts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hosts = yield host_service_1.hostService.getAllHosts();
        res.status(200).json(hosts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getHostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const host = yield host_service_1.hostService.getHostById(req.params.id);
        if (!host)
            return res.status(404).json({ message: 'Host not found' });
        res.status(200).json(host);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hostId = req.params.id;
        const { rating } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }
        const updatedHost = yield host_service_1.hostService.addRating(hostId, rating);
        res.status(200).json(updatedHost);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.hostController = {
    createHost,
    getAllHosts,
    getHostById,
    addRating,
};

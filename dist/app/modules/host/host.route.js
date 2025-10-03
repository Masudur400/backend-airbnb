"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostRoutes = void 0;
const express_1 = __importDefault(require("express"));
const host_controller_1 = require("./host.controller");
const router = express_1.default.Router();
router.post('/', host_controller_1.hostController.createHost);
router.get('/', host_controller_1.hostController.getAllHosts);
router.get('/:id', host_controller_1.hostController.getHostById);
router.patch('/:id', host_controller_1.hostController.addRating);
exports.HostRoutes = router;

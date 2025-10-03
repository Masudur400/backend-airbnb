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
exports.hostService = void 0;
const host_model_1 = __importDefault(require("./host.model"));
const createHost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const host = new host_model_1.default(data);
    yield host.save();
    return host;
});
const getAllHosts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield host_model_1.default.find();
});
const getHostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield host_model_1.default.findById(id);
});
const addRating = (hostId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const host = yield host_model_1.default.findById(hostId);
    if (!host)
        throw new Error('Host not found');
    const currentTotal = (_a = host.totalRatings) !== null && _a !== void 0 ? _a : 0;
    const currentAverage = (_b = host.averageRating) !== null && _b !== void 0 ? _b : 0;
    const newTotal = currentTotal + 1;
    const newAverage = (currentAverage * currentTotal + rating) / newTotal;
    host.totalRatings = newTotal;
    host.averageRating = parseFloat(newAverage.toFixed(2));
    yield host.save();
    return host;
});
exports.hostService = {
    createHost,
    getAllHosts,
    getHostById,
    addRating,
};

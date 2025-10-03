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
exports.propertyService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const property_model_1 = require("./property.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createProperty = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const property = new property_model_1.Property(data);
    return yield property.save();
});
const getAllProperties = (location, guest) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (location) {
        query.location = { $regex: `^${location}$`, $options: "i" };
    }
    if (guest !== undefined && !isNaN(guest)) {
        query.guest = { $lte: guest };
    }
    const properties = yield property_model_1.Property.find(query).populate("hostId");
    const total = yield property_model_1.Property.countDocuments(query);
    return { properties, total };
});
const getPropertyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield property_model_1.Property.findById(id).populate("hostId");
});
const updateProperty = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield property_model_1.Property.findByIdAndUpdate(id, data, { new: true });
});
const deleteProperty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield property_model_1.Property.findByIdAndDelete(id);
});
const addPropertyRating = (propertyId, ratingData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(propertyId)) {
        throw new Error("Invalid property ID");
    }
    const property = yield property_model_1.Property.findById(propertyId);
    if (!property)
        throw new Error("Property not found");
    property.propertyTotalRatingPeople.push(ratingData);
    const totalRatings = property.propertyTotalRatingPeople.length;
    const sumRatings = property.propertyTotalRatingPeople.reduce((acc, r) => acc + r.givenRating, 0);
    property.propertyTotalRating = totalRatings;
    property.propertyAvgRating = parseFloat((sumRatings / totalRatings).toFixed(1));
    yield property.save();
    return {
        propertyAvgRating: property.propertyAvgRating,
        propertyTotalRating: property.propertyTotalRating
    };
});
const getLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield property_model_1.Property.aggregate([
        {
            $group: {
                _id: "$location",
                count: { $sum: 1 },
                maxGuest: { $max: { $toInt: "$guest" } },
                minGuest: { $min: { $toInt: "$guest" } }
            }
        },
        {
            $project: {
                _id: 0,
                location: "$_id",
                count: 1,
                maxGuest: 1,
                minGuest: 1
            }
        }
    ]);
    return locations;
});
exports.propertyService = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    addPropertyRating,
    getLocations
};

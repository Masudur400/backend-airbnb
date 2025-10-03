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
exports.propertyController = void 0;
const property_service_1 = require("./property.service");
const createProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield property_service_1.propertyService.createProperty(req.body);
        res.status(201).json(property);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const getAllProperties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, guest } = req.query;
        const guestCount = guest !== undefined ? Number(guest) : undefined;
        if (guestCount !== undefined && isNaN(guestCount)) {
            return res.status(400).json({
                success: false,
                message: "Guest must be a number",
            });
        }
        const { properties, total } = yield property_service_1.propertyService.getAllProperties(location, guestCount);
        res.status(200).json({
            success: true,
            message: "Properties retrieved successfully",
            meta: {
                total,
            },
            data: properties,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch properties",
            error: error.message,
        });
    }
});
// const getAllProperties = async (_req: Request, res: Response) => {
//   try {
//     const properties = await propertyService.getAllProperties();
//     res.status(200).json(properties);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };
const getPropertyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield property_service_1.propertyService.getPropertyById(req.params.id);
        res.status(200).json(property);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property = yield property_service_1.propertyService.updateProperty(req.params.id, req.body);
        res.status(200).json(property);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield property_service_1.propertyService.deleteProperty(req.params.id);
        res.status(200).json({ message: "Property deleted" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const addPropertyRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { propertyId } = req.params;
        const { userName, image, userLocation, howMuchStay, givenRating, description } = req.body;
        const ratingData = {
            userName,
            image,
            userLocation,
            createAt: new Date(),
            howMuchStay,
            givenRating,
            description
        };
        const updatedRatings = yield property_service_1.propertyService.addPropertyRating(propertyId, ratingData);
        res.status(200).json(Object.assign({ message: "Rating added successfully" }, updatedRatings));
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
});
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield property_service_1.propertyService.getLocations();
        res.status(200).json({
            success: true,
            message: "All property locations retrieved successfully",
            data: locations,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch property locations",
            error: error.message,
        });
    }
});
exports.propertyController = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    addPropertyRating,
    getLocations
};

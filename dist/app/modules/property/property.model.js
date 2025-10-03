"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const PropertyRatingSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    image: { type: String, required: true },
    userLocation: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    howMuchStay: { type: String, enum: ["Stayed one night", "Stayed one Day", "Stayed a few nights"], required: true },
    givenRating: { type: Number, required: true },
    description: { type: String }
});
const FeatureSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String }
});
const PropertySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    location: { type: String, required: true },
    stay: {
        type: String,
        enum: ["one night", "one Day", "one day two night", "to day one night"],
        required: true
    },
    price: { type: Number, required: true },
    guest: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    bathroomType: { type: String },
    propertyDescription: { type: String },
    image: [{ type: String }],
    mapImg: { type: String },
    hostId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Host", required: true },
    propertyAvgRating: { type: Number, default: 0 },
    propertyTotalRating: { type: Number, default: 0 },
    propertyTotalRatingPeople: [PropertyRatingSchema],
    features: [FeatureSchema],
    cleanlinessRating: { type: Number, default: 0 },
    accuracyRating: { type: Number, default: 0 },
    check_inRating: { type: Number, default: 0 },
    communicationRating: { type: Number, default: 0 },
    locationRating: { type: Number, default: 0 },
    valueRating: { type: Number, default: 0 },
    include: [{ type: String }]
}, { timestamps: true, versionKey: false });
exports.Property = mongoose_1.default.model("Property", PropertySchema);

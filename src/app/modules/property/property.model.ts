import mongoose, { Schema } from "mongoose";
import { IProperty } from "./property.interface";

const PropertyRatingSchema = new Schema({
  userName: { type: String, required: true },
  userLocation: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  howMuchStay: { type: String, enum: ["Stayed one night", "Stayed one Day", "Stayed a few nights"], required: true },
  givenRating: { type: Number, required: true },
  description: { type: String }
});

const FeatureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String }
});

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  subTitle: { type: String },
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
  hostId: { type: Schema.Types.ObjectId, ref: "Host", required: true },
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

export const Property = mongoose.model<IProperty>("Property", PropertySchema);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Property } from "./property.model";
import { IProperty } from "./property.interface";

// Create property
  const createProperty = async (data: Partial<IProperty>) => {
  const property = new Property(data);
  return await property.save();
};

// Get all properties with host data
  const getAllProperties = async () => {
  return await Property.find().populate("hostId");
};

// Get single property by ID with host data
  const getPropertyById = async (id: string) => {
  return await Property.findById(id).populate("hostId");
};

// Update property
  const updateProperty = async (id: string, data: Partial<IProperty>) => {
  return await Property.findByIdAndUpdate(id, data, { new: true });
};

// Delete property
  const deleteProperty = async (id: string) => {
  return await Property.findByIdAndDelete(id);
};

// Add rating to a property
  const addRating = async (propertyId: string, ratingData: any) => {
  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found");

  property.propertyTotalRatingPeople.push(ratingData);
  property.propertyTotalRating = property.propertyTotalRatingPeople.length;

  property.propertyAvgRating =
    property.propertyTotalRatingPeople.reduce((sum, r) => sum + r.givenRating, 0) /
    property.propertyTotalRating;

  await property.save();
  return property;
};

export const propertyService ={
createProperty,
getAllProperties,
getPropertyById,
updateProperty,
deleteProperty,
addRating
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Property } from "./property.model";
import { IProperty, IPropertyRatingPeople } from "./property.interface";
import mongoose from "mongoose";


const createProperty = async (data: Partial<IProperty>) => {
  const property = new Property(data)
  return await property.save()
}


const getAllProperties = async (location?: string, guest?: number) => {
  const query: any = {}
  if (location) {
    query.location = { $regex: `^${location}$`, $options: "i" }
  } 
  if (guest !== undefined && !isNaN(guest)) {
    query.guest = { $lte: guest }
  } 
  const properties = await Property.find(query).populate("hostId")
  const total = await Property.countDocuments(query)
  return { properties, total }
};



const getPropertyById = async (id: string) => {
  return await Property.findById(id).populate("hostId")
}


const updateProperty = async (id: string, data: Partial<IProperty>) => {
  return await Property.findByIdAndUpdate(id, data, { new: true })
}


const deleteProperty = async (id: string) => {
  return await Property.findByIdAndDelete(id)
}



const addPropertyRating = async (propertyId: string, ratingData: IPropertyRatingPeople) => {
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    throw new Error("Invalid property ID")
  }
  const property = await Property.findById(propertyId)
  if (!property) throw new Error("Property not found")
  property.propertyTotalRatingPeople.push(ratingData)
  const totalRatings = property.propertyTotalRatingPeople.length
  const sumRatings = property.propertyTotalRatingPeople.reduce(
    (acc, r) => acc + r.givenRating,
    0
  )
  property.propertyTotalRating = totalRatings
  property.propertyAvgRating = parseFloat((sumRatings / totalRatings).toFixed(1))
  await property.save()
  return {
    propertyAvgRating: property.propertyAvgRating,
    propertyTotalRating: property.propertyTotalRating
  }
}


const getLocations = async () => {
  const locations = await Property.aggregate([
    { $group: { _id: "$location", count: { $sum: 1 },maxGuest: { $max: "$guest" } } },
    { $project: { _id: 0, location: "$_id", count: 1 , maxGuest: 1} }
  ]);
  return locations
};

export const propertyService = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  addPropertyRating,
  getLocations
}
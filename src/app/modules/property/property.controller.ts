/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { propertyService } from "./property.service";

const createProperty = async (req: Request, res: Response) => {
  try {
    const property = await propertyService.createProperty(req.body)
    res.status(201).json(property)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}


const getAllProperties = async (req: Request, res: Response) => {
  try {
    const { location, guest } = req.query
    const guestCount = guest !== undefined ? Number(guest) : undefined 
    if (guestCount !== undefined && isNaN(guestCount)) {
      return res.status(400).json({
        success: false,
        message: "Guest must be a number",
      })
    } 
    const { properties, total } = await propertyService.getAllProperties(
      location as string | undefined,
      guestCount
    )
    res.status(200).json({
      success: true,
      message: "Properties retrieved successfully",
      meta: {
        total,
      },
      data: properties,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    })
  }
}


// const getAllProperties = async (_req: Request, res: Response) => {
//   try {
//     const properties = await propertyService.getAllProperties();
//     res.status(200).json(properties);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id)
    res.status(200).json(property)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await propertyService.updateProperty(req.params.id, req.body)
    res.status(200).json(property)
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

const deleteProperty = async (req: Request, res: Response) => {
  try {
    await propertyService.deleteProperty(req.params.id)
    res.status(200).json({ message: "Property deleted" })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

const addPropertyRating = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params
    const { userName, image, userLocation, howMuchStay, givenRating, description } = req.body 
    const ratingData = {
      userName,
      image,
      userLocation,
      createAt: new Date(),
      howMuchStay,
      givenRating,
      description
    }
    const updatedRatings = await propertyService.addPropertyRating(propertyId, ratingData); 
    res.status(200).json({
      message: "Rating added successfully",
      ...updatedRatings
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
}



const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await propertyService.getLocations()
    res.status(200).json({
      success: true,
      message: "All property locations retrieved successfully",
      data: locations,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch property locations",
      error: error.message,
    })
  }
}


export const propertyController = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  addPropertyRating,
  getLocations
}

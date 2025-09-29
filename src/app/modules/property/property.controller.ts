/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express"; 
import { propertyService } from "./property.service";

  const createProperty = async (req: Request, res: Response) => {
  try {
    const property = await propertyService.createProperty(req.body);
    res.status(201).json(property);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

  const getAllProperties = async (_req: Request, res: Response) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.status(200).json(properties);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

  const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    res.status(200).json(property);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

  const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await propertyService.updateProperty(req.params.id, req.body);
    res.status(200).json(property);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

 const deleteProperty = async (req: Request, res: Response) => {
  try {
    await propertyService.deleteProperty(req.params.id);
    res.status(200).json({ message: "Property deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

 const addRating = async (req: Request, res: Response) => {
  try {
    const property = await propertyService.addRating(req.params.id, req.body);
    res.status(200).json(property);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const propertyController ={
createProperty,
getAllProperties,
getPropertyById,
updateProperty,
deleteProperty,
addRating
}

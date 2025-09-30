import { Document, Types } from "mongoose";
import { IHost } from "../host/host.interface";

export interface IPropertyRatingPeople {
  userName: string
  image: string
  userLocation: string
  createAt: Date
  howMuchStay: "Stayed one night" | "Stayed one Day" | "Stayed a few nights"
  givenRating: number
  description: string
}

export interface IPropertyFeature {
  title: string
  description: string
}

export interface IProperty extends Document {
  title: string
  subTitle: string
  location: string
  stay: "one night" | "one Day" | "one day two night" | "to day one night"
  price: number
  guest: number
  bedroom: number
  bathroom: number
  bathroomType: string
  propertyDescription: string
  image: string[]
  mapImg: string
  hostId: Types.ObjectId
  hostData?: IHost
  propertyAvgRating: number
  propertyTotalRating: number
  propertyTotalRatingPeople: IPropertyRatingPeople[]
  features: IPropertyFeature[]
  cleanlinessRating: number
  accuracyRating: number
  check_inRating: number
  communicationRating: number
  locationRating: number
  valueRating: number
  include: string[]
}

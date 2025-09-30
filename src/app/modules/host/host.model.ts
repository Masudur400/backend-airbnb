import mongoose, { Schema, Document } from 'mongoose';
import { IHost } from './host.interface';

interface HostDocument extends IHost, Document {}

 
const hostSchema = new Schema<HostDocument>({
    name: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    about: { type: String },
    details: { type: String },
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 }, 
}, { timestamps: true, versionKey: false })  

export default mongoose.model<HostDocument>('Host', hostSchema)

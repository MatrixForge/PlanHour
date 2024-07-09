import mongoose, { Document, Schema, model } from 'mongoose';

interface IPhotographerCompany extends Document {
  companyName: string;
  description: string;
  image: string;
  city: string;
  location: string;
  phone: string;
  minPrice: number;
  maxPrice: number;
  services: string[];
  rating: number;
  staff: string[];
}

const PhotographerCompanySchema: Schema = new Schema({
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  city: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  services: { type: [String], required: true },
  rating: { type: Number, required: true },
  staff: { type: [String], required: true }
});

const PhotographerCompany = mongoose.models.PhotographerCompany || model<IPhotographerCompany>('PhotographerCompany', PhotographerCompanySchema);

export default PhotographerCompany;

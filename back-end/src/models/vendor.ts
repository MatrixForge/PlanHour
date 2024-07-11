import mongoose, { Document, Schema, model } from 'mongoose';

interface IVendorCompany extends Document {
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

const VendorCompanySchema: Schema = new Schema({
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

const Vendor = mongoose.models.PhotographerCompany || model<IVendorCompany>('VendorCompanySchema', VendorCompanySchema);

export default Vendor;
import { Document, Schema, model } from 'mongoose';
import bcrypt from "bcryptjs";
// import { IStore } from '../interfaces/storeInterface';

interface IStore extends Document {
    storeName: string;
    storeGenre: string;
    foodGenre: string;
    cookingGenre: string;
    address: string;
    access: string;
    storeImages: string;
    explanatoryText: string;
}

const storeSchema = new Schema<IStore>({
    storeName: { type: String, required: true },
    storeGenre: { type: String },
    foodGenre: { type: String },
    cookingGenre: { type: String },
    address: { type: String, required: true },
    access: { type: String },
    storeImages: { type: String},
    explanatoryText: { type: String},
});

const Store = model<IStore>('Store', storeSchema);
export default Store;

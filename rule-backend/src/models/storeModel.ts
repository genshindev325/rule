import { Document, Schema, model } from 'mongoose';
import bcrypt from "bcryptjs";
// import { IStore } from '../interfaces/storeInterface';

export interface IStore extends Document {
    email: string;
    password: string;

    storeName: string;
    storeGenre: string;
    foodGenre: string;
    cookingGenre: string;
    address: string;
    access: string;
    storeImages: string;
    explanatoryText: string;

    comparePassword: (password: string) => Promise<boolean>;
}

const storeSchema = new Schema<IStore>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    storeName: { type: String },
    storeGenre: { type: String },
    foodGenre: { type: String },
    cookingGenre: { type: String },
    address: { type: String },
    access: { type: String },
    storeImages: { type: String },
    explanatoryText: { type: String },
});

storeSchema.pre<IStore>("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Store = model<IStore>('Store', storeSchema);
export default Store;

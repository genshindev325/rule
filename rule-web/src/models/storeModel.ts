import mongoose, { Model, Document, Schema } from 'mongoose';
import bcrypt from "bcryptjs";
// import { IStore } from '../interfaces/storeInterface';

export interface IStore extends Document {
    email: string;
    password: string;
    createdAt: Date;

    storeID: string;
    storeName: string;
    storeGenre: string;
    foodGenre: string;
    cookingGenre: string;
    address: string;
    access: string;
    storeImages: string;
    explanatoryText: string;
    monthlyRate: Number;

    // Optional
    rating: Number;
    ratingCount: { type: Number },

    comparePassword: (password: string) => Promise<boolean>;
}

const storeSchema = new Schema<IStore>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },

    storeID: { type: String, default: "1111-2222-3333-44444"},
    storeName: { type: String, default: "" },
    storeGenre: { type: String },
    foodGenre: { type: String },
    cookingGenre: { type: String },
    address: { type: String },
    access: { type: String },
    storeImages: { type: String },
    explanatoryText: { type: String },
    monthlyRate: { type: Number, default: 5000 },

    // Optional
    rating: { type: Number },
    ratingCount: { type: Number },
});

storeSchema.pre<IStore>("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
  
storeSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
}

const Store: Model<IStore> = mongoose.models.Store || mongoose.model<IStore>('Store', storeSchema);
export default Store;
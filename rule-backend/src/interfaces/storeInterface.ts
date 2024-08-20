import { Document } from "mongoose";

export interface IStore extends Document {
    storeName: string;
    storeGenre: string;
    foodGenre: string;
    cookingGenre: string;
    address: string;
    access: string;
    storeImages: string;
    explanatoryText: string;
}

import { Document, Schema, model } from 'mongoose';
//import { IReview } from '../interfaces/reviewInterface';

interface IReview extends Document {
    eventName: string;                  // Event that the review is about
    storeName: string;                  // Store that the review is about
    createdBy: string;                  // User who created the review
    createdAt: Date;                     // 
    reviewText: string;
}

const reviewSchema = new Schema<IReview>({
    eventName: { type: String, required: true },
    storeName: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, required: true },
    reviewText: { type: String },
});


const Review = model<IReview>('Event', reviewSchema);
export default Review;
